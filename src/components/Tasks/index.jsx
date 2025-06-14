import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Typography,
  Fab,
  TablePagination,
  Chip,
  Stack,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { COLORS } from "../../utils/colors";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import { api } from "../../api";
import { useSelector } from "react-redux";
import { taskSchema } from "../../utils/helper";
import theme from "../../theme";
import CustomHeader from "../../shared/CustomHeader";
import CustomTable from "../../shared/custom-table";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";
import Button from "../../shared/CustomButton";
import Select from "../../shared/custom-select";
import CustomModal from "../../shared/custom-model";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState({});
  const { role, id } = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  const fetchTasks = useCallback(async () => {
    try {
      const [tasksResponse, usersResponse] = await Promise.all([
        api.TASKS.get_all(),
        api.USERS.get_all(),
      ]);

      const usersMap = usersResponse.data.reduce((acc, user) => {
        acc[user.id] = `${user.firstName} ${user.lastName}`;
        return acc;
      }, {});
      setUsers(usersMap);

      if (!tasksResponse.data) return;
      if (role === "admin") {
        setTasks(tasksResponse.data);
      } else if (role === "user") {
        const data = tasksResponse.data.filter((task) => task.user_id === id);
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [role, id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTasks({});
      return;
    }

    const matches = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resultObject = matches.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {});

    setFilteredTasks(resultObject);
  }, [searchTerm, tasks]);

  const handleAddTask = async (data) => {
    try {
      await api.TASKS.create({
        data: {
          ...data,
          status: "pending",
          createdAt: new Date().toISOString(),
          user_id: id,
        },
      });
      await fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = useCallback(
    async (taskId, newStatus) => {
      try {
        const taskToUpdate = tasks.find((task) => task.id === taskId);
        if (!taskToUpdate) return;

        await api.TASKS.update({
          id: taskId,
          data: { ...taskToUpdate, status: newStatus },
        });
        await fetchTasks();
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },
    [fetchTasks, tasks]
  );

  const columns = useMemo(() => {
    const baseColumns = [
      { id: "title", label: "Title", field_name: "title" },
      { id: "description", label: "Description", field_name: "description" },
      {
        id: "createdAt",
        label: "Created date",
        field_name: "createdAt",
        render: ({ row }) => new Date(row.createdAt).toLocaleDateString(),
      },
      {
        id: "priority",
        label: "Priority",
        field_name: "priority",
        render: ({ row }) => {
          const textColor =
            row.priority === "High"
              ? COLORS.ERROR[800]
              : row.priority === "Medium"
                ? COLORS.WARNING[800]
                : COLORS.PRIMARY[800];

          const bgColor =
            row.priority === "High"
              ? COLORS.ERROR[50]
              : row.priority === "Medium"
                ? COLORS.WARNING[100]
                : COLORS.PRIMARY[50];
          return (
            <Chip
              label={row.priority}
              sx={{
                color: textColor,
                backgroundColor: bgColor,
              }}
            />
          );
        },
      },
      {
        id: "status",
        label: "Status",
        field_name: "status",
        render: ({ row }) => {
          const textColor =
            row.status === "approved"
              ? COLORS.PRIMARY[800]
              : row.status === "rejected"
                ? COLORS.ERROR[800]
                : COLORS.WARNING[800];

          const bgColor =
            row.status === "approved"
              ? COLORS.PRIMARY[50]
              : row.status === "rejected"
                ? COLORS.ERROR[50]
                : COLORS.WARNING[100];
          return (
            <Chip
              label={row.status}
              sx={{
                color: textColor,
                backgroundColor: bgColor,
              }}
            />
          );
        },
      },
    ];
    if (role === "admin") {
      return [
        {
          id: "username",
          label: "Username",
          field_name: "username",
          render: ({ row }) => users[row.user_id] || "Unknown User",
        },
        ...baseColumns,
        {
          id: "actions",
          label: "Actions",
          field_name: "actions",
          render: ({ row }) => {
            if (row.status === "pending") {
              return (
                <Stack
                  sx={{
                    gap: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomButton
                    size="small"
                    onClick={() => handleStatusChange(row.id, "approved")}
                    variant="contained"
                  >
                    Approve
                  </CustomButton>
                  <CustomButton
                    size="small"
                    onClick={() => handleStatusChange(row.id, "rejected")}
                    variant="outlined"
                  >
                    Reject
                  </CustomButton>
                </Stack>
              );
            } else {
              return (
                <Typography variant="body2" color="textSecondary">
                  {row.status === "approved" ? "Approved" : "Rejected"}
                </Typography>
              );
            }
          },
        },
      ];
    } else return baseColumns;
  }, [handleStatusChange, role, users]);

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  return (
    <>
      <CustomHeader />
      <Box
        sx={{ padding: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            Tasks Management
          </Typography>
          {role === "user" && (
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setOpenModal(true)}
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  opacity: 0.9,
                },
              }}
            >
              <AddIcon />
            </Fab>
          )}
        </Box>

        <CustomInput
          name="search"
          register={register}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search…"
          startAdornment={<SearchIcon sx={{ color: COLORS.NEUTRAL.dark }} />}
          size="small"
          variant="outlined"
        />

        <CustomTable
          columns={columns}
          data={searchTerm ? Object.values(filteredTasks) : tasks}
          tableName="tasks"
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            ".MuiTablePagination-select": {
              color: theme.palette.primary.main,
            },
          }}
        />

        {/* Add Task Modal */}
        <CustomModal
          fullWidth
          open={openModal}
          onClose={handleCloseModal}
          title="Add New Task"
          actions={
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <Button variant="outlined" fullWidth onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                form="add-task-form"
                fullWidth
              >
                Add Task
              </Button>
            </Box>
          }
        >
          <Form
            id="add-task-form"
            onSubmit={handleSubmit(handleAddTask)}
            noValidate
          >
            <Stack gap={2}>
              <FormGroup
                sx={{ width: "100%" }}
                {...{
                  fullWidth: true,
                  label: "Title",
                  name: "title",
                  register,
                  error: errors["title"],
                  placeholder: "Enter task title",
                  type: "text",
                }}
              />
              <FormGroup
                sx={{ width: "100%" }}
                {...{
                  fullWidth: true,
                  label: "Description",
                  name: "description",
                  register,
                  error: errors["description"],
                  placeholder: "Enter task description",
                  type: "text",
                  multiline: true,
                  rows: 3,
                }}
              />
              <FormGroup
                name="priority"
                error={errors["priority"]}
                sx={{ width: "100%" }}
                component={
                  <Select
                    {...register("priority")}
                    options={priorityOptions}
                    error={!!errors["priority"]}
                    helperText={errors["priority"]?.message}
                    placeholder="Select priority"
                    label="Priority"
                  />
                }
              />
            </Stack>
          </Form>
        </CustomModal>
      </Box>
    </>
  );
};

export default Tasks;
