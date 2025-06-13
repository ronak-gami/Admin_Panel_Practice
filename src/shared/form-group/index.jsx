import { Stack, Typography } from "@mui/material";
import CustomInput from "../CustomInput";

const FormGroup = ({
  label,
  labelSx = {},
  error,
  errorSx = {},
  sx,
  select,
  ...props
}) => {
  return (
    <Stack sx={sx} gap={0.5}>
      {label ? (
        <label style={{ fontWeight: 500, fontSize: 14, ...labelSx }}>
          {label}
        </label>
      ) : null}
      {select ? select : <CustomInput {...{ error }} {...props} />}
      <Typography variant="caption" color="error" sx={{ ...errorSx }}>
        {error?.message || ""}
      </Typography>
    </Stack>
  );
};

export default FormGroup;
