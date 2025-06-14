import { createTheme } from "@mui/material";
import { COLORS } from "../utils/colors";

const theme = createTheme({
  palette: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    error: COLORS.ERROR,
    warning: COLORS.WARNING,
    neutral: COLORS.NEUTRAL,
    accent: COLORS.ACCENT,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
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
          backgroundColor: COLORS.PRIMARY.main,
          color: COLORS.PRIMARY.contrastText,
          "&:hover": {
            backgroundColor: COLORS.PRIMARY.dark,
          },
        },
        containedSecondary: {
          backgroundColor: COLORS.SECONDARY.main,
          color: COLORS.SECONDARY.contrastText,
          "&:hover": {
            backgroundColor: COLORS.SECONDARY.dark,
          },
        },
        outlined: {
          borderColor: COLORS.PRIMARY.main,
          color: COLORS.PRIMARY.main,
          "&:hover": {
            borderColor: COLORS.PRIMARY.dark,
          },
        },
        text: {
          color: COLORS.PRIMARY.main,
          "&:hover": {
            backgroundColor: "rgba(23, 184, 166, 0.04)",
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
            top: 0,
          },
          "& .MuiOutlinedInput-notchedOutline > legend": {
            display: "none",
          },
          "&.MuiInputBase-adornedStart": {
            color: COLORS.NEUTRAL[700],
          },
          "&.MuiInputBase-adornedEnd": {
            color: COLORS.NEUTRAL[700],
          },
        },
        input: {
          padding: "12px 14px",
          color: COLORS.NEUTRAL[700],
        },
        inputMultiline: {
          padding: 0,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
          marginBottom: 4,
          color: COLORS.NEUTRAL[700],
          position: "static",
          transform: "none",
          transition: "color 0.2s ease",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: COLORS.NEUTRAL[700],
        },
        positionStart: {
          marginRight: "8px",
          color: COLORS.NEUTRAL[700],
        },
        positionEnd: {
          marginLeft: "8px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          padding: "12px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderTop: "none",
          borderBottom: "none",
          padding: "12px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "12px",
        },
      },
    },
  },
});

export default theme;
