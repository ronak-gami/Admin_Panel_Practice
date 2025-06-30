import { Box, Paper, Typography } from "@mui/material";
import { COLORS } from "../../utils/colors";

const ChartCard = ({ title, value, subtitle, percentage, children }) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 3,
      border: `1px solid ${COLORS.NEUTRAL[300]}`,
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    {title && (
      <Typography variant="body1" color="text.secondary">
        {title || null}
      </Typography>
    )}
    {value && (
      <Typography
        variant="h3"
        component="h2"
        sx={{ my: 1, fontWeight: "bold" }}
      >
        {value || null}
      </Typography>
    )}
    {subtitle && percentage && (
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" component="span" color="text.secondary">
          {subtitle || null}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "success.main", fontWeight: "bold", ml: 1 }}
        >
          {percentage || null}
        </Typography>
      </Box>
    )}
    <Box sx={{ height: "250px" }}>{children}</Box>
  </Paper>
);

export default ChartCard;
