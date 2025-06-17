import { Menu, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { COLORS } from "../../utils/colors";
import theme from "../../theme";

const CustomMenu = ({
  anchorEl,
  onClose,
  options = [],
  transformOrigin = { horizontal: "right", vertical: "top" },
  anchorOrigin = { horizontal: "right", vertical: "bottom" },
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      transformOrigin={transformOrigin}
      anchorOrigin={anchorOrigin}
    >
      {options.map((option) => (
        <MenuItem
          key={option.label}
          onClick={() => {
            option.onClick();
            onClose();
          }}
          sx={{
            color: option.color || COLORS.NEUTRAL[900],
            "&:hover": {
              backgroundColor: option.color
                ? `${option.color}15`
                : theme.palette.action.hover,
            },
          }}
        >
          {option.icon && (
            <ListItemIcon sx={{ color: "inherit" }}>{option.icon}</ListItemIcon>
          )}
          <ListItemText>{option.label}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CustomMenu;
