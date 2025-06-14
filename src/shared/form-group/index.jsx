import { Stack, Typography } from "@mui/material";
import CustomInput from "../CustomInput";

const FormGroup = ({ component, error, errorSx = {}, sx, ...props }) => {
  return (
    <Stack sx={sx} gap={0.5}>
      {component ? component : <CustomInput {...props} error={error} />}
      {error?.message && (
        <Typography variant="caption" color="error" sx={errorSx}>
          {error.message}
        </Typography>
      )}
    </Stack>
  );
};

export default FormGroup;
