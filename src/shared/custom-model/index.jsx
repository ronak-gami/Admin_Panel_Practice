import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({
  onClose,
  title,
  children,
  actions,
  showCloseIcon = true,
  titleSx = {},
  contentSx = {},
  ...props
}) => {
  return (
    <Dialog {...props}>
      {title && (
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ...titleSx,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          {showCloseIcon && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ ml: 2 }}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent dividers sx={{ ...contentSx }}>
        {children}
      </DialogContent>

      {actions && <DialogActions sx={{ p: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
};

export default CustomModal;
