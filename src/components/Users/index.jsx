import { useCallback, useEffect, useMemo, useState } from "react";
import { Typography, Box, TablePagination, Button } from "@mui/material";
import { api } from "../../api";
import { COLORS } from "../../utils/colors";
import CustomLoader from "../../shared/custom-loader";
import theme from "../../theme";
import CustomHeader from "../../shared/custom-header";
import CustomTable from "../../shared/custom-table";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { role } = useSelector((state) => state.auth.userData);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.USERS.get_all();
      // Get all users except the current admin
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

        // Find the user and update their data
        const userToUpdate = users.find((user) => user.id === userId);
        if (!userToUpdate) return;

        // Make API call to update user role
        await api.USERS.update({
          id: userId,
          data: { ...userToUpdate, role: newRole },
        });

        // Refresh the users list
        await fetchUsers();
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    },
    [users]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          render: ({ row }) => (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleRoleChange(row.id, row.role)}
              sx={{
                backgroundColor:
                  row.role === "admin"
                    ? COLORS.NEUTRAL.dark
                    : theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              {row.role === "admin" ? "Make User" : "Make Admin"}
            </Button>
          ),
        },
      ];
    }
  }, [handleRoleChange, role]);

  return (
    <>
      <CustomHeader />
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            marginBottom: 3,
          }}
        >
          User Management
        </Typography>

        <CustomTable columns={columns} data={users} tableName="users" />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${COLORS.NEUTRAL.light}`,
            ".MuiTablePagination-select": {
              color: theme.palette.primary.main,
            },
          }}
        />
      </Box>
    </>
  );
};

export default Users;
