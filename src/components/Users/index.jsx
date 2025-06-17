import { Typography, Box } from "@mui/material";
import theme from "../../theme";
import CustomHeader from "../../shared/custom-header";
import CustomTable from "../../shared/custom-table";
import CustomMenu from "../../shared/custom-menu";
import useUsers from "./useUsers";
import { COLORS } from "../../utils/colors";

const Users = () => {
  const {
    columns,
    data,
    order,
    orderBy,
    handleRequestSort,
    anchorEl,
    handleMenuClose,
    menuOptions,
  } = useUsers();

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
          columns={columns}
          data={data}
          tableName="users"
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          itemsPerPage={8}
        />

        <CustomMenu
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          options={menuOptions}
        />
      </Box>
    </>
  );
};

export default Users;
