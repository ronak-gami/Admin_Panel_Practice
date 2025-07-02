// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DesktopDatePicker } from "@mui/x-date-pickers";
// import { Stack, Typography } from "@mui/material";

// const CustomDatePicker = ({
//   value,
//   onChange,
//   label,
//   error,
//   fullWidth,
//   slotProps = {},
//   ...props
// }) => {
//   console.log("props: ", props);
//   return (
//     <Stack
//       gap={0.5}
//       sx={{ width: fullWidth ? "100%" : "auto", borderRadius: 12 }}
//     >
//       {label && (
//         <Typography
//           variant="caption"
//           sx={{
//             fontSize: "0.85rem",
//             fontWeight: 500,
//             color: "neutral.700",
//           }}
//         >
//           {label}
//         </Typography>
//       )}
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DesktopDatePicker
//           value={value ? dayjs(value) : null}
//           onChange={onChange}
//           sx={{ width: "100%" }}
//           slotProps={{
//             textField: {
//               error: !!error,
//               ...slotProps,
//               placeholder: slotProps.placeholder || "MM/DD/YYYY",
//             },
//             inputAdornment: {
//               position: "end",
//             },
//           }}
//           {...props}
//         />
//       </LocalizationProvider>
//     </Stack>
//   );
// };

// export default CustomDatePicker;

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({ error, ...props }) => {
  console.log("props: ", props);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ width: "100%" }}
        slotProps={{
          textField: {
            error: !!error,
            placeholder: props.placeholder || "MM/DD/YYYY",
          },
          inputAdornment: {
            position: "end",
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
