// useTasks.jsx

import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { api } from "../../api";
import { taskSchema } from "../../utils/helper";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import { COLORS } from "../../utils/colors";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [filters, setFilters] = useState({
    date: [],
    priority: [],
    status: [],
  });

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
      const tasksData = tasksResponse.data || [];
      setTasks(
        role === "admin"
          ? tasksData
          : tasksData.filter((task) => task.user_id === id)
      );
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

  const handleMenuOpen = useCallback((event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleDelete = useCallback(
    async (task) => {
      try {
        await api.TASKS.delete({ id: task.id });
        await fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    [fetchTasks]
  );

  const handleActions = useCallback(
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

  const handlePageChange = (event, value) => {
    setPage(value);
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
    setPage(1);
  };

  const movePendingTasksToTop = (arr) => {
    const pendingTasks = arr.filter((task) => task.status === "pending");
    const otherTasks = arr.filter((task) => task.status !== "pending");
    return [...pendingTasks, ...otherTasks];
  };

  const paginatedTasks = useMemo(() => {
    let filteredData = searchTerm ? Object.values(filteredTasks) : [...tasks];

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

    const sortedData = movePendingTasksToTop(filteredData);
    return sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [page, itemsPerPage, searchTerm, filteredTasks, tasks, filters]);

  const totalPages = Math.ceil(
    (searchTerm ? Object.values(filteredTasks).length : tasks.length) /
      itemsPerPage
  );

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
          render: ({ row }) => users[row.user_id] || "Unknown",
        },
        ...baseColumns,
        {
          id: "actions",
          label: "Actions",
          render: ({ row }) => (
            <IconButton onClick={(e) => handleMenuOpen(e, row)}>
              <MoreVertIcon />
            </IconButton>
          ),
        },
      ];
    }
    return baseColumns;
  }, [role, users, handleMenuOpen]);

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

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
    paginatedTasks,
    totalPages,
    page,
    handlePageChange,
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
  };
};
