import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import { taskSchema } from "../../utils/helper";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import { COLORS } from "../../utils/colors";
import {
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import theme from "../../theme";
import { fetchTasks, fetchUsers } from "../../redux/slices/data.slice";

export const useTasks = () => {
  const dispatch = useDispatch();
  const tasksFromStore = useSelector((state) => state.data.tasks);
  const usersFromStore = useSelector((state) => state.data.users);
  const { role, id } = useSelector((state) => state.auth.userData);
  const [filteredTasks, setFilteredTasks] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [filters, setFilters] = useState({
    date: [],
    priority: [],
    status: [],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersMap = useMemo(() => {
    return usersFromStore.reduce((acc, user) => {
      acc[user.id] = `${user.firstName} ${user.lastName}`;
      return acc;
    }, {});
  }, [usersFromStore]);

  const roleFilteredTasks = useMemo(() => {
    if (role === "admin") {
      return tasksFromStore;
    }
    return tasksFromStore.filter((task) => task.user_id === id);
  }, [tasksFromStore, role, id]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTasks({});
      return;
    }

    const matches = roleFilteredTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resultObject = matches.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {});
    setFilteredTasks(resultObject);
  }, [searchTerm, roleFilteredTasks]);

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
      dispatch(fetchTasks());
      handleCloseModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = useCallback(
    async (task) => {
      try {
        await api.TASKS.delete({ id: task.id });
        dispatch(fetchTasks());
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    [dispatch]
  );

  const handleActions = useCallback(
    async (taskId, newStatus) => {
      try {
        const taskToUpdate = tasksFromStore.find((task) => task.id === taskId);
        if (!taskToUpdate) return;
        await api.TASKS.update({
          id: taskId,
          data: { ...taskToUpdate, status: newStatus },
        });
        dispatch(fetchTasks());
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },
    [dispatch, tasksFromStore]
  );

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  const handleMenuOpen = useCallback((event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleClearFilters = () => {
    setFilters({ date: [], priority: [], status: [] });
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const movePendingTasksToTop = (arr) => {
    const pendingTasks = arr.filter((task) => task.status === "pending");
    const otherTasks = arr.filter((task) => task.status !== "pending");
    return [...pendingTasks, ...otherTasks];
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filteredData = searchTerm
      ? Object.values(filteredTasks)
      : [...roleFilteredTasks];

    if (filters.date.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      filteredData = filteredData.filter((task) => {
        const taskDate = new Date(task.createdAt);
        taskDate.setHours(0, 0, 0, 0);
        return filters.date.some((filter) => {
          if (filter === "today") return taskDate.getTime() === today.getTime();
          if (filter === "yesterday")
            return taskDate.getTime() === yesterday.getTime();
          if (filter === "lastWeek") return taskDate >= lastWeek;
          if (filter === "lastMonth") return taskDate >= lastMonth;
          return true;
        });
      });
    }
    if (filters.priority.length > 0)
      filteredData = filteredData.filter((task) =>
        filters.priority.includes(task.priority.toLowerCase())
      );
    if (filters.status.length > 0)
      filteredData = filteredData.filter((task) =>
        filters.status.includes(task.status.toLowerCase())
      );

    return movePendingTasksToTop(filteredData);
  }, [searchTerm, filteredTasks, roleFilteredTasks, filters]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const columns = useMemo(() => {
    const baseColumns = [
      { id: "title", label: "Title", field_name: "title" },
      { id: "description", label: "Description", field_name: "description" },
      {
        id: "createdAt",
        label: "Created date",
        render: ({ row }) => new Date(row.createdAt).toLocaleDateString(),
      },
      {
        id: "priority",
        label: "Priority",
        colAlign: "center",
        render: ({ row }) => (
          <Chip
            label={row.priority}
            sx={{
              color:
                row.priority === "High"
                  ? COLORS.ERROR[800]
                  : row.priority === "Medium"
                    ? COLORS.WARNING[800]
                    : COLORS.PRIMARY[800],
              backgroundColor:
                row.priority === "High"
                  ? COLORS.ERROR[50]
                  : row.priority === "Medium"
                    ? COLORS.WARNING[100]
                    : COLORS.PRIMARY[50],
            }}
          />
        ),
      },
      {
        id: "status",
        label: "Status",
        colAlign: "center",
        render: ({ row }) => (
          <Chip
            label={row.status}
            sx={{
              color:
                row.status === "approved"
                  ? COLORS.PRIMARY[800]
                  : row.status === "rejected"
                    ? COLORS.ERROR[800]
                    : COLORS.WARNING[800],
              backgroundColor:
                row.status === "approved"
                  ? COLORS.PRIMARY[50]
                  : row.status === "rejected"
                    ? COLORS.ERROR[50]
                    : COLORS.WARNING[100],
            }}
          />
        ),
      },
    ];
    if (role === "admin") {
      return [
        {
          id: "username",
          label: "Username",
          render: ({ row }) => usersMap[row.user_id] || "Unknown",
        },
        ...baseColumns,
        {
          id: "actions",
          label: "Actions",
          colAlign: "center",
          render: ({ row }) => (
            <IconButton onClick={(e) => handleMenuOpen(e, row)}>
              <MoreVertIcon />
            </IconButton>
          ),
        },
      ];
    }
    return baseColumns;
  }, [role, usersMap, handleMenuOpen]);

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const menuOptions = useMemo(() => {
    const options = [];

    if (selectedTask?.status === "pending") {
      options.push(
        {
          label: "Approve",
          onClick: () => handleActions(selectedTask.id, "approved"),
          color: COLORS.PRIMARY.main,
          icon: <CheckIcon fontSize="small" />,
        },
        {
          label: "Reject",
          onClick: () => handleActions(selectedTask.id, "rejected"),
          color: COLORS.NEUTRAL[600],
          icon: <CloseIcon fontSize="small" />,
        }
      );
    }

    options.push({
      label: "Delete",
      onClick: () => handleDelete(selectedTask),
      color: theme.palette.error.main,
      icon: <DeleteIcon fontSize="small" />,
    });

    return options;
  }, [selectedTask, handleActions, handleDelete]);

  return {
    role,
    openModal,
    setOpenModal,
    setSearchTerm,
    register,
    handleSubmit,
    reset,
    errors,
    handleAddTask,
    handleCloseModal,
    columns,
    tasks: filteredAndSortedTasks,
    priorityOptions,
    anchorEl,
    selectedTask,
    handleMenuClose,
    handleDelete,
    handleActions,
    filterAnchorEl,
    filters,
    handleFilterClick,
    handleFilterClose,
    handleFilterChange,
    handleRequestSort,
    order,
    orderBy,
    menuOptions,
    handleClearFilters,
  };
};
