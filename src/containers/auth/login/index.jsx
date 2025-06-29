import {
  Box,
  Container,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "../../../shared/custom-button";
import Form from "../../../shared/form";
import FormGroup from "../../../shared/form-group";
import { COLORS } from "../../../utils/colors";
import useLogin from "./useLogin";
import Snackbar from "../../../shared/custom-snackbar";

const Login = () => {
  const {
    loading,
    register,
    handleSubmit,
    errors,
    handleLogin,
    navigate,
    URLS,
    showSnack,
  } = useLogin();

  return (
    <Container
      maxWidth={false}
      sx={{
        alignItems: "center",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            padding: 4,
            maxWidth: 500,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            borderRadius: 3,
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Login
          </Typography>

          <Form
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack gap={2}>
              <FormGroup
                {...{
                  fullWidth: true,
                  label: "Email",
                  name: "email",
                  register,
                  error: errors.email,
                  placeholder: "Enter your email",
                  type: "text",
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormGroup
                {...{
                  fullWidth: true,
                  label: "Password",
                  name: "password",
                  register,
                  error: errors.password,
                  placeholder: "Enter your password",
                  type: "password",
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                variant="body2"
                textAlign="right"
                onClick={() => navigate(URLS.FORGOT_PASSWORD)}
                sx={{
                  cursor: "pointer",
                  color: COLORS.PRIMARY.main,
                  "&:hover": {
                    opacity: 0.85,
                    color: COLORS.PRIMARY.dark,
                  },
                }}
              >
                Forgot password?
              </Typography>
              <Button
                loading={loading}
                variant="contained"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </Stack>
          </Form>
        </Paper>
        <Snackbar
          message={showSnack.message}
          stateChange={showSnack.flag}
          type={showSnack.type}
        />
      </Box>
    </Container>
  );
};

export default Login;
