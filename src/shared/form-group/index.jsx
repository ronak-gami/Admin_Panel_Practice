import { cloneElement } from "react";
import { Stack, Typography } from "@mui/material";
import CustomInput from "../custom-input";

const FormGroup = ({
  component,
  error,
  errorSx = {},
  sx,
  fullWidth,
  ...props
}) => {
  return (
    <Stack sx={sx} gap={0.5}>
      {component ? (
        cloneElement(component, {
          fullWidth,
        })
      ) : (
        <CustomInput {...props} error={error} fullWidth={fullWidth} />
      )}
      {error?.message && (
        <Typography variant="caption" color="error" sx={errorSx}>
          {error.message || ""}
        </Typography>
      )}
    </Stack>
  );
};

export default FormGroup;
