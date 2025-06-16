import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../api";
import { COLORS } from "../../utils/colors";
import theme from "../../theme";
import { useSelector } from "react-redux";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { role } = useSelector((state) => state.auth.userData);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.USERS.get_all();
      const filteredUsers = response.data.filter((user) => user.id !== 100);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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

        await fetchUsers();
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    },
    [users]
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
          render: ({ row }) => ({
            buttonText: row.role === "admin" ? "Make User" : "Make Admin",
            buttonColor:
              row.role === "admin"
                ? COLORS.NEUTRAL.dark
                : theme.palette.primary.main,
            userId: row.id,
            currentRole: row.role,
          }),
        },
      ];
    }
    return baseColumns;
  }, [role]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const sortedUsers = [...users].sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return b[orderBy] > a[orderBy] ? 1 : -1;
      }
    });

    return sortedUsers.slice(startIndex, endIndex);
  }, [users, page, itemsPerPage, order, orderBy]);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return {
    users,
    columns,
    handleRoleChange,
    paginatedUsers,
    totalPages,
    page,
    handlePageChange,
    order,
    orderBy,
    handleRequestSort,
  };
};

export default useUsers;
