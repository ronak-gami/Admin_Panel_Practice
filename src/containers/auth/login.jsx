import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { loginValidationSchema } from "../../utils/helper";
import Button from "../../shared/custom-button";
import { api } from "../../api";
import { setHeaders } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData, setToken } from "../../redux/slices/auth.slice";
import { URLS } from "../../constants/urls";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";
import { COLORS } from "../../utils/colors";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const response = await api.AUTH.login({
        data: {
          email: data.email,
          password: data.password,
        },
      });
      const { user, token } = response.data;
      if (user && token) {
        localStorage.setItem("token", token);
        dispatch(setUserData(user));
        dispatch(setToken(token));
        setHeaders("Authorization", `Bearer ${token}`);
        navigate(URLS.DASHBOARD);
      } else {
        return;
      }
    } catch (error) {
      setError(
        error?.response?.data?.error || "Login failed. please try again"
      );
    } finally {
      setLoading(false);
    }
  };

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
          <Typography color="error.500" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
          <Form
            handleSubmit={handleSubmit(handleLogin)}
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
                  error: errors["email"],
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
                  error: errors["password"],
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
      </Box>
    </Container>
  );
};

export default Login;
