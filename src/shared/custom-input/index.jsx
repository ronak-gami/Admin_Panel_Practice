import { useCallback, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomInput = ({
  name,
  register,
  error,
  startAdornment,
  endAdornment,
  type,
  ...props
}) => {
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <TextField
      {...register(name)}
      {...props}
      error={!!error}
      type={type === "password" && !showPassword ? "password" : "text"}
      InputProps={{
        startAdornment,
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : (
            endAdornment
          ),
      }}
    />
  );
};

export default CustomInput;
