import {
  Box,
  Typography,
  Fab,
  Stack,
  Menu,
  MenuItem,
  ListItemText,
  IconButton,
  Pagination,
  Popover,
  FormControl,
  FormLabel,
  FormControlLabel,
  Divider,
  Checkbox,
  FormGroup as MuiFormGroup,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterListAlt as FilterIcon,
} from "@mui/icons-material";
import { useTasks } from "./useTasks";
import { COLORS } from "../../utils/colors";
import CustomInput from "../../shared/custom-input";
import theme from "../../theme";
import CustomHeader from "../../shared/custom-header";
import CustomTable from "../../shared/custom-table";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";
import Button from "../../shared/custom-button";
import Select from "../../shared/custom-select";
import CustomModal from "../../shared/custom-model";

const Tasks = () => {
  const {
    role,
    openModal,
    setOpenModal,
    setSearchTerm,
    register,
    handleSubmit,
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
  } = useTasks();

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
            sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
          >
            Tasks Management
          </Typography>
          {role === "user" && (
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setOpenModal(true)}
            >
              <AddIcon />
            </Fab>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CustomInput
            name="search"
            register={register}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search…"
            startAdornment={<SearchIcon sx={{ color: COLORS.NEUTRAL.dark }} />}
            size="small"
          />
          <IconButton onClick={handleFilterClick}>
            <FilterIcon
              color={
                Object.values(filters).some((arr) => arr.length > 0)
                  ? "primary"
                  : "inherit"
              }
            />
          </IconButton>
        </Box>

        <Popover
          open={Boolean(filterAnchorEl)}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Box sx={{ p: 2, width: 250 }}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Created Date</FormLabel>
              <MuiFormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.date.includes("today")}
                      onChange={() => handleFilterChange("date", "today")}
                    />
                  }
                  label="Today"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.date.includes("yesterday")}
                      onChange={() => handleFilterChange("date", "yesterday")}
                    />
                  }
                  label="Yesterday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.date.includes("lastWeek")}
                      onChange={() => handleFilterChange("date", "lastWeek")}
                    />
                  }
                  label="Last Week"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.date.includes("lastMonth")}
                      onChange={() => handleFilterChange("date", "lastMonth")}
                    />
                  }
                  label="Last Month"
                />
              </MuiFormGroup>
            </FormControl>
            <Divider sx={{ my: 2 }} />
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Priority</FormLabel>
              <MuiFormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.priority.includes("high")}
                      onChange={() => handleFilterChange("priority", "high")}
                    />
                  }
                  label="High"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.priority.includes("medium")}
                      onChange={() => handleFilterChange("priority", "medium")}
                    />
                  }
                  label="Medium"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.priority.includes("low")}
                      onChange={() => handleFilterChange("priority", "low")}
                    />
                  }
                  label="Low"
                />
              </MuiFormGroup>
            </FormControl>
            <Divider sx={{ my: 2 }} />
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Status</FormLabel>
              <MuiFormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.status.includes("pending")}
                      onChange={() => handleFilterChange("status", "pending")}
                    />
                  }
                  label="Pending"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.status.includes("approved")}
                      onChange={() => handleFilterChange("status", "approved")}
                    />
                  }
                  label="Approved"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.status.includes("rejected")}
                      onChange={() => handleFilterChange("status", "rejected")}
                    />
                  }
                  label="Rejected"
                />
              </MuiFormGroup>
            </FormControl>
          </Box>
        </Popover>

        <CustomTable
          columns={columns}
          data={paginatedTasks}
          tableName="tasks"
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

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {selectedTask?.status === "pending" && [
            <MenuItem
              key="approve"
              onClick={() => {
                handleActions(selectedTask.id, "approved");
                handleMenuClose();
              }}
              sx={{ color: COLORS.PRIMARY.main }}
            >
              <ListItemText>Approve</ListItemText>
            </MenuItem>,
            <MenuItem
              key="reject"
              onClick={() => {
                handleActions(selectedTask.id, "rejected");
                handleMenuClose();
              }}
              sx={{ color: COLORS.NEUTRAL[600] }}
            >
              <ListItemText>Reject</ListItemText>
            </MenuItem>,
          ]}
          <MenuItem
            onClick={() => {
              handleDelete(selectedTask);
              handleMenuClose();
            }}
            sx={{ color: "error.main" }}
          >
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>

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
                label="Title"
                name="title"
                register={register}
                error={errors.title}
                placeholder="Enter task title"
                type="text"
              />
              <FormGroup
                label="Description"
                name="description"
                register={register}
                error={errors.description}
                placeholder="Enter task description"
                type="text"
                multiline
                rows={3}
              />
              <FormGroup
                name="priority"
                error={errors.priority}
                select={
                  <Select
                    {...register("priority")}
                    options={priorityOptions}
                    error={!!errors.priority}
                    helperText={errors.priority?.message}
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
