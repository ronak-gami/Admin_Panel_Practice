import Btn from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Button = ({
  label,
  children,
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <Btn disabled={disabled || loading} {...props}>
      {loading ? (
        <CircularProgress color="inherit" size={24} />
      ) : (
        label || children
      )}
    </Btn>
  );
};

export default Button;
