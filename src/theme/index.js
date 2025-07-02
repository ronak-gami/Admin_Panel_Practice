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
          "& .MuiOutlinedInput-notchedOutline > legend": {
            maxWidth: 0,
          },
        },
        input: {
          padding: "12px 12px",
          color: COLORS.NEUTRAL[700],
          "&::placeholder": {
            color: COLORS.NEUTRAL[500],
            opacity: 1,
          },
        },
        inputAdornedStart: {
          paddingLeft: "0px",
        },
        inputAdornedEnd: {
          paddingRight: "0px",
        },
        inputMultiline: {
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          fontSize: "0.85rem",
          color: COLORS.NEUTRAL[700],
          position: "static",
          transform: "none",
          fontWeight: 500,
          marginBottom: "4px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: COLORS.NEUTRAL[700],
        },
        positionStart: {
          color: COLORS.NEUTRAL[700],
        },
        positionEnd: {
          color: COLORS.NEUTRAL[700],
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          padding: "16px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderTop: "none",
          borderBottom: "none",
          padding: "16px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});

export default theme;
