import CustomHeader from "../../shared/custom-header";
import { Paper, Stack } from "@mui/material";
import { COLORS } from "../../utils/colors";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";
import { useAssignTasks } from "./useAssign-tasks";

const AssignTasks = () => {
  const { register, errors, priorityOptions } = useAssignTasks();
  return (
    <>
      <CustomHeader />
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          border: `1px solid ${COLORS.NEUTRAL[400]}`,
          boxSizing: "border-box",
        }}
      >
        AssignTasks
        <Form
          id="add-task-form"
          onSubmit={() => console.log("Form Submitted")}
          noValidate
        >
          <Stack gap={2}>
            <FormGroup
              sx={{ width: "100%" }}
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
              sx={{ width: "100%" }}
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
            <FormGroup
              name="priority"
              error={errors["priority"]}
              sx={{ width: "100%" }}
              component={
                <Select
                  {...register("priority")}
                  options={priorityOptions}
                  error={!!errors["priority"]}
                  placeholder="Select priority"
                  label="Priority"
                />
              }
            />
          </Stack>
        </Form>
      </Paper>
    </>
  );
};

export default AssignTasks;
