import { MenuItem, Select as MuiSelect, Typography } from "@mui/material";

const Select = ({
  name,
  value,
  onChange,
  handleChange,
  placeholder,
  handleBlur,
  options,
  ...props
}) => {
  return (
    <MuiSelect
      {...{ name, value }}
      displayEmpty={true}
      onChange={(e) => {
        onChange && onChange(e);
        handleChange && handleChange(e);
      }}
      onBlur={handleBlur}
      renderValue={(selected) => {
        if (!selected) {
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
        return options?.find((opt) => opt?.value === selected)?.label;
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
  );
};

export default Select;
