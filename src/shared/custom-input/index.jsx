import { useCallback, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomInput = ({
  name,
  register,
  error,
  startAdornment,
  endAdornment,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <TextField
      {...register(name)}
      {...props}
      error={!!error}
      type={props.type === "password" && !showPassword ? "password" : "text"}
      InputProps={{
        startAdornment,
        endAdornment:
          props.type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={handleToggle} edge="end">
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
