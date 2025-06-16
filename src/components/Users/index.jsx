import { Typography, Box, Button, Pagination } from "@mui/material";
import theme from "../../theme";
import CustomHeader from "../../shared/custom-header";
import CustomTable from "../../shared/custom-table";
import useUsers from "./useUsers";

const Users = () => {
  const {
    columns,
    handleRoleChange,
    paginatedUsers,
    totalPages,
    page,
    handlePageChange,
    order,
    orderBy,
    handleRequestSort,
  } = useUsers();

  const renderColumns = columns.map((col) => {
    if (col.id !== "actions") return col;

    return {
      ...col,
      render: ({ row }) => {
        const actionData = col.render({ row });
        return (
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              handleRoleChange(actionData.userId, actionData.currentRole)
            }
            sx={{
              backgroundColor: actionData.buttonColor,
              color: theme.palette.primary.contrastText,
            }}
          >
            {actionData.buttonText}
          </Button>
        );
      },
    };
  });

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

        <CustomTable
          columns={renderColumns}
          data={paginatedUsers}
          tableName="users"
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      </Box>
    </>
  );
};

export default Users;
