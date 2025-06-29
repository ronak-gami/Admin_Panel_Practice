import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { deleteUser, fetchUsers } from "../../redux/slices/data.slice";
import theme from "../../theme";
import { COLORS } from "../../utils/colors";

const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.data.users);
  const { role } = useSelector((state) => state.auth.userData);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = useCallback(
    async (userId, currentRole) => {
      try {
        const newRole = currentRole === "admin" ? "user" : "admin";
        const userToUpdate = users.find((user) => user.id === userId);
        if (!userToUpdate) return;

        await api.USERS.update({
          id: userId,
          data: { ...userToUpdate, role: newRole },
        });
        dispatch(fetchUsers());
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    },
    [dispatch, users]
  );

  const handleDeleteUser = useCallback(
    async (userId) => {
      try {
        await api.USERS.delete({ id: userId });
        dispatch(deleteUser(userId));
        dispatch(fetchUsers());
        handleMenuClose();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    [dispatch]
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleMenuOpen = useCallback((event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const columns = useMemo(() => {
    const baseColumns = [
      { id: "id", label: "ID", field_name: "id" },
      { id: "firstName", label: "First Name", field_name: "firstName" },
      { id: "lastName", label: "Last Name", field_name: "lastName" },
      { id: "email", label: "Email", field_name: "email" },
      { id: "role", label: "Role", field_name: "role" },
    ];
    if (role === "admin") {
      return [
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
  }, [role, handleMenuOpen]);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return b[orderBy] > a[orderBy] ? 1 : -1;
      }
    });
  }, [users, order, orderBy]);

  const menuOptions = [
    {
      label: selectedUser?.role === "admin" ? "Make User" : "Make Admin",
      onClick: () => handleRoleChange(selectedUser?.id, selectedUser?.role),
      color:
        selectedUser?.role === "admin"
          ? COLORS.NEUTRAL[600]
          : theme.palette.primary.main,
    },
    {
      label: "Delete",
      onClick: () => handleDeleteUser(selectedUser?.id),
      color: theme.palette.error.main,
    },
  ];

  return {
    columns,
    data: sortedUsers,
    order,
    orderBy,
    handleRequestSort,
    anchorEl,
    selectedUser,
    handleMenuClose,
    handleDeleteUser,
    menuOptions,
  };
};

export default useUsers;
