import { createTheme } from "@mui/material";
import { primary, secondary } from "../utils/colors";

export default createTheme({
  palette: {
    primary,
    secondary,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: "none",
          padding: "8px 20px",
          fontSize: "0.9rem",
          boxShadow: "none",
        },
        containedPrimary: {
          backgroundColor: primary.main,
          color: primary.contrastText,
          "&:hover": {
            backgroundColor: primary.dark,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          },
        },
        containedSecondary: {
          backgroundColor: secondary.main,
          color: secondary.contrastText,
          "&:hover": {
            backgroundColor: secondary.dark,
          },
        },
        outlined: {
          borderColor: primary.main,
          color: primary.main,
          "&:hover": {
            borderColor: primary.dark,
            backgroundColor: "rgba(4, 100, 100, 0.04)",
          },
        },
        text: {
          color: primary.main,
          "&:hover": {
            backgroundColor: "rgba(4, 100, 100, 0.04)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.95rem",
          borderRadius: 8,
          "& .MuiOutlinedInput-notchedOutline": {
            top: 0, // 🔥 This sets the fieldset top to 0
          },
          "& .MuiOutlinedInput-notchedOutline > legend": {
            display: "none",
          },
        },
        input: {
          padding: "12px 14px",
          // Adjust padding if adornments exist
          "&.MuiInputBase-inputAdornedStart": {
            paddingLeft: 10,
          },
          "&.MuiInputBase-inputAdornedEnd": {
            paddingRight: 0,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
          marginBottom: 4,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginLeft: 8,
          marginRight: 8,
          color: "#999",
        },
      },
    },
  },
});
