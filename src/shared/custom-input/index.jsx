import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useToggle from "../../hooks/use-toggle";

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
