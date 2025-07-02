import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const CustomDatePicker = ({
  error,
  label = "Date",
  placeholder = "MM/DD/YYYY",
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        slots={{
          textField: (textFieldProps) => (
            <TextField
              {...textFieldProps}
              label={label}
              placeholder={placeholder}
              error={!!error}
              sx={{ size: "small" }}
              fullWidth
              variant="outlined"
            />
          ),
        }}
        sx={{
          "& fieldset legend": {
            display: "none",
          },
          "& input::placeholder": {
            opacity: 1,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
