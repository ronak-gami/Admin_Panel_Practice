import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import * as React from "react";
import { COLORS } from "../../utils/colors";
import theme from "../../theme";
import { getComparator } from "../../utils/helper";

const CustomTable = ({
  columns,
  data,
  tableName,
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const sortedData = React.useMemo(() => {
    if (order && orderBy) {
      return [...data].sort(getComparator(order, orderBy));
    }
    return data;
  }, [order, orderBy, data]);

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
                sortDirection={orderBy === col.id ? order : false}
                sx={{
                  backgroundColor: theme.palette.primary[50],
                  color: COLORS.NEUTRAL[900],
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : "asc"}
                  onClick={createSortHandler(col.id)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedData.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>No data found.</TableCell>
            </TableRow>
          ) : (
            sortedData.map((row, rowIndex) => (
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
