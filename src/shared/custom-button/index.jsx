import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({
  label,
  children,
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading ? (
        <CircularProgress color="inherit" size={24} />
      ) : (
        label || children
      )}
    </Button>
  );
};

export default CustomButton;
