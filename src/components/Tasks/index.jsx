import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Paper,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  TablePagination,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { COLORS } from "../../utils/colors";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import CustomLoader from "../../shared/CustomLoader";
import { api } from "../../api";
import { useSelector } from "react-redux";
import { taskSchema } from "../../utils/helper";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [role, id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (data) => {
    console.log("data: ", data);
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setLoading(true);
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) return;

      await api.TASKS.update({
        id: taskId,
        data: { ...taskToUpdate, status: newStatus },
      });
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CustomLoader fullScreen />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: COLORS.primary,
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
              backgroundColor: COLORS.primary,
              "&:hover": {
                backgroundColor: COLORS.primary,
                opacity: 0.9,
              },
            }}
          >
            <AddIcon />
          </Fab>
        )}
      </Box>

      <Paper
        elevation={9}
        sx={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: COLORS.white,
          borderRadius: 2,
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="tasks table">
            <TableHead>
              <TableRow>
                {[
                  ...(role === "admin" ? ["User Name"] : []),
                  "Title",
                  "Description",
                  "Due Date",
                  "Priority",
                  "Status",
                  ...(role === "admin" ? ["Actions"] : []),
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: COLORS.secondary,
                      color: COLORS.darkgray,
                      fontWeight: 600,
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task) => (
                  <TableRow
                    key={task.id}
                    sx={{
                      backgroundColor:
                        task.status === "approved"
                          ? `${COLORS.secondary}80`
                          : task.status === "rejected"
                            ? `${COLORS.lightgray}50`
                            : "transparent",
                    }}
                  >
                    {role === "admin" && (
                      <TableCell sx={{ color: COLORS.darkgray }}>
                        {users[task.user_id]}
                      </TableCell>
                    )}
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      {task.title}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      {task.description}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      <Box
                        sx={{
                          backgroundColor:
                            task.priority === "High"
                              ? "#FEE2E2"
                              : task.priority === "Medium"
                                ? "#FEF3C7"
                                : "#DCFCE7",
                          color:
                            task.priority === "High"
                              ? "#991B1B"
                              : task.priority === "Medium"
                                ? "#92400E"
                                : "#166534",
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          display: "inline-block",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {task.priority}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      <Box
                        sx={{
                          backgroundColor:
                            task.status === "approved"
                              ? "#DCFCE7"
                              : task.status === "rejected"
                                ? "#FEE2E2"
                                : "#FEF3C7",
                          color:
                            task.status === "approved"
                              ? "#166534"
                              : task.status === "rejected"
                                ? "#991B1B"
                                : "#92400E",
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          display: "inline-block",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {task.status}
                      </Box>
                    </TableCell>
                    {role === "admin" && task.status === "pending" && (
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <CustomButton
                            size="small"
                            onClick={() =>
                              handleStatusChange(task.id, "approved")
                            }
                            sx={{
                              backgroundColor: COLORS.primary,
                              "&:hover": {
                                backgroundColor: COLORS.primary,
                                opacity: 0.9,
                              },
                            }}
                          >
                            Approve
                          </CustomButton>
                          <CustomButton
                            size="small"
                            onClick={() =>
                              handleStatusChange(task.id, "rejected")
                            }
                            sx={{
                              backgroundColor: COLORS.darkgray,
                              "&:hover": {
                                backgroundColor: COLORS.darkgray,
                                opacity: 0.9,
                              },
                            }}
                          >
                            Reject
                          </CustomButton>
                        </Box>
                      </TableCell>
                    )}
                    {role === "admin" && task.status !== "pending" && (
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {task.status === "approved" ? "Approved" : "Rejected"}
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={role === "admin" ? 7 : 5}
                    align="center"
                    sx={{
                      py: 3,
                      color: COLORS.darkgray,
                    }}
                  >
                    No tasks found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${COLORS.lightgray}`,
            ".MuiTablePagination-select": {
              color: COLORS.primary,
            },
          }}
        />
      </Paper>

      {/* Add Task Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-task-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: COLORS.white,
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: COLORS.primary,
              fontWeight: 600,
              mb: 3,
              textAlign: "center",
            }}
          >
            Add New Task
          </Typography>
          <form onSubmit={handleSubmit(handleAddTask)} noValidate>
            <CustomInput
              name="title"
              label="Title"
              register={register}
              errors={errors}
            />
            <CustomInput
              name="description"
              label="Description"
              register={register}
              errors={errors}
              multiline
              rows={4}
            />
            <CustomInput
              name="priority"
              register={register}
              errors={errors}
              select
              SelectProps={{ native: true }}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </CustomInput>
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <CustomButton
                onClick={handleCloseModal}
                fullWidth
                sx={{
                  backgroundColor: COLORS.lightgray,
                  "&:hover": {
                    backgroundColor: COLORS.lightgray,
                    opacity: 0.9,
                  },
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton type="submit" loading={loading} fullWidth>
                Add Task
              </CustomButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Tasks;
