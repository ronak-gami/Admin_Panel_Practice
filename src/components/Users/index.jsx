import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TablePagination,
  Button,
} from "@mui/material";
import { api } from "../../api";
import { COLORS } from "../../utils/colors";
import CustomLoader from "../../shared/CustomLoader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.USERS.get_all();
      // Get all users except the current admin
      const filteredUsers = response.data.filter(
        (user) => user.id !== 100 // Assuming 100 is the main admin ID
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <CustomLoader fullScreen />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h5"
        sx={{
          color: COLORS.primary,
          fontWeight: 600,
          marginBottom: 3,
        }}
      >
        User Management
      </Typography>

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
          <Table stickyHeader aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.darkgray,
                    fontWeight: 600,
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.darkgray,
                    fontWeight: 600,
                  }}
                >
                  First Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.darkgray,
                    fontWeight: 600,
                  }}
                >
                  Last Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.darkgray,
                    fontWeight: 600,
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.darkgray,
                    fontWeight: 600,
                  }}
                >
                  Role
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.darkgray,
                    fontWeight: 600,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: COLORS.secondary,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      {user.id}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      {user.firstName}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      {user.lastName}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      {user.email}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.darkgray }}>
                      {user.role}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleRoleChange(user.id, user.role)}
                        sx={{
                          backgroundColor:
                            user.role === "admin"
                              ? COLORS.darkgray
                              : COLORS.primary,
                          color: COLORS.white,
                          "&:hover": {
                            backgroundColor:
                              user.role === "admin"
                                ? COLORS.darkgray
                                : COLORS.primary,
                            opacity: 0.9,
                          },
                        }}
                      >
                        {user.role === "admin" ? "Make User" : "Make Admin"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{
                      py: 3,
                      color: COLORS.darkgray,
                    }}
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
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
    </Box>
  );
};

export default Users;
