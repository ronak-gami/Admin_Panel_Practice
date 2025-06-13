import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { COLORS } from "../../utils/colors";
import theme from "../../theme";

const CustomTable = ({ columns, data, tableName }) => {
  return (
    <TableContainer
      sx={{ borderRadius: 1, border: `1px solid ${COLORS.NEUTRAL[400]}` }}
    >
      <Table stickyHeader aria-label={`${tableName} table`}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                sx={{
                  backgroundColor: theme.palette.primary[50],
                  color: COLORS.NEUTRAL[900],
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>No data found.</TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor:
                    row.status === "approved"
                      ? `${COLORS.NEUTRAL[50]}`
                      : row.status === "rejected"
                        ? `${COLORS.NEUTRAL[100]}`
                        : "transparent",
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={`${row.id}-${col.id}`}
                    sx={{
                      color: COLORS.NEUTRAL.dark,
                      textAlign: "center",
                      display: "",
                      gap: 1,
                    }}
                  >
                    {col.render
                      ? col.render({ row, rowIndex })
                      : row[col.field_name]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
