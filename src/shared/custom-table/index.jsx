import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
} from "@mui/material";
import { COLORS } from "../../utils/colors";
import theme from "../../theme";
import { getComparator } from "../../utils/helper";
import { useMemo, useState } from "react";

const CustomTable = ({
  columns,
  data,
  tableName,
  order,
  orderBy,
  onRequestSort,
  itemsPerPage = 5,
}) => {
  const [page, setPage] = useState(1);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const sortedData = useMemo(() => {
    if (order && orderBy) {
      return [...data].sort(getComparator(order, orderBy));
    }
    return data;
  }, [order, orderBy, data]);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, page, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
                  backgroundColor: theme.palette.primary[75],
                  color: COLORS.NEUTRAL[900],
                  textAlign: col?.colAlign ? col?.colAlign : "left",
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
          {paginatedData.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>No data found.</TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, rowIndex) => (
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
                      textAlign: col?.colAlign ? col?.colAlign : "start",
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

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </TableContainer>
  );
};

export default CustomTable;
