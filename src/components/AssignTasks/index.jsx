import CustomHeader from "../../shared/custom-header";
import { Box, Paper, Stack } from "@mui/material";
import { COLORS } from "../../utils/colors";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";
import { useAssignTasks } from "./useAssign-tasks";
import Select from "../../shared/custom-select";
import CustomDatePicker from "../../shared/custom-datePicker";
import Button from "../../shared/custom-button";

const AssignTasks = () => {
  const {
    register,
    handleSubmit,
    // reset,
    errors,
    priorityOptions,
    userFullNames,
    setValue,
    watch,
  } = useAssignTasks();
  return (
    <>
      <CustomHeader />
      <Box sx={{ p: 5, width: "75%" }}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            border: `1px solid ${COLORS.NEUTRAL[400]}`,
            boxSizing: "border-box",
          }}
        >
          <Form
            id="assign-task-form"
            onSubmit={handleSubmit(() => console.log("Form Submitted"))}
            noValidate
          >
            <Stack gap={2}>
              <FormGroup
                {...{
                  fullWidth: true,
                  label: "Title",
                  name: "title",
                  register,
                  error: errors["title"],
                  placeholder: "Enter task title",
                  type: "text",
                }}
              />
              <FormGroup
                {...{
                  fullWidth: true,
                  label: "Description",
                  name: "description",
                  register,
                  error: errors["description"],
                  placeholder: "Enter task description",
                  type: "text",
                  multiline: true,
                  rows: 3,
                }}
              />
              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <FormGroup
                  sx={{ width: "100%" }}
                  {...{
                    fullWidth: true,
                    name: "priority",
                    register,
                    error: errors["priority"],
                    component: (
                      <Select
                        {...register("priority")}
                        options={priorityOptions}
                        error={!!errors["priority"]}
                        placeholder="Select priority"
                        label="Priority"
                      />
                    ),
                  }}
                />
                <FormGroup
                  sx={{ width: "100%" }}
                  {...{
                    fullWidth: true,
                    name: "assignedTo",
                    register,
                    error: errors["assignedTo"],
                    component: (
                      <Select
                        options={userFullNames}
                        error={!!errors["assignedTo"]}
                        placeholder="Select users"
                        label="Assigned To"
                        multiple
                        value={watch("assignedTo")}
                        onChange={(e) => setValue("assignedTo", e.target.value)}
                      />
                    ),
                  }}
                />
                <FormGroup
                  sx={{ width: "100%" }}
                  {...{
                    fullWidth: true,
                    name: "dueDate",
                    register,
                    error: errors["dueDate"],
                    component: (
                      <CustomDatePicker
                        value={watch("dueDate")}
                        onChange={(date) => setValue("dueDate", date)}
                        error={!!errors.dueDate}
                        placeholder="MM/DD/YYYY"
                        label="Due Date"
                        disablePast
                      />
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => console.log("cancel button clicked")}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  form="assign-task-form"
                  fullWidth
                >
                  Add Task
                </Button>
              </Box>
            </Stack>
          </Form>
        </Paper>
      </Box>
    </>
  );
};

export default AssignTasks;
