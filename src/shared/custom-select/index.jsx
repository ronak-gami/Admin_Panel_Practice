import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Typography,
} from "@mui/material";
import { useId } from "react";

const Select = ({
  onChange,
  handleChange,
  placeholder,
  handleBlur,
  options,
  label,
  error,
  multiple = false,
  ...props
}) => {
  const labelId = useId();

  return (
    <FormControl fullWidth error={error}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}

      <MuiSelect
        multiple={multiple}
        displayEmpty
        onChange={(e) => {
          onChange && onChange(e);
          handleChange && handleChange(e);
        }}
        onBlur={handleBlur}
        renderValue={(selected) => {
          if (!selected || selected.length === 0) {
            return (
              <Typography
                variant="body2"
                color="textDisabled"
                fontWeight={400}
                component="span"
              >
                {placeholder}
              </Typography>
            );
          }

          return multiple
            ? selected
                .map((val) => options.find((opt) => opt.value === val)?.label)
                .join(", ")
            : (options.find((opt) => opt.value === selected)?.label ?? "");
        }}
        MenuProps={{ disableScrollLock: true }}
        {...props}
      >
        {options.map(({ value: optionValue, label }) => (
          <MenuItem key={optionValue} value={optionValue}>
            <Typography variant="body2" fontWeight={500} color="textSecondary">
              {label}
            </Typography>
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
