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
    <Typography variant="body1" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h3" component="h2" sx={{ my: 1, fontWeight: "bold" }}>
      {value}
    </Typography>
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" component="span" color="text.secondary">
        {subtitle}
      </Typography>
      <Typography
        variant="body2"
        component="span"
        sx={{ color: "success.main", fontWeight: "bold", ml: 1 }}
      >
        {percentage}
      </Typography>
    </Box>
    <Box sx={{ height: "150px" }}>{children}</Box>
  </Paper>
);

export default ChartCard;
