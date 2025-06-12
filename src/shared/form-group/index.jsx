import { Stack, Typography } from "@mui/material";
import CustomInput from "../CustomInput";

const FormGroup = ({ label, labelSx = {}, error, errorSx = {}, ...props }) => {
  console.log("error", error);

  return (
    <Stack gap={1}>
      {label ? (
        <label style={{ fontWeight: 500, fontSize: 14, ...labelSx }}>
          {label}
        </label>
      ) : null}
      <CustomInput {...{ error }} {...props} />
      {error ? (
        <Typography variant="caption" color="error" sx={{ ...errorSx }}>
          {error?.message || ""}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default FormGroup;
