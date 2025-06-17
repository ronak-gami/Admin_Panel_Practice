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
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setToken } from "../../redux/slices/auth.slice";
import { URLS } from "../../constants/urls";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";
import theme from "../../theme";

const Login = () => {
  const state = useSelector((state) => state);
  console.log("----------------state----------------", state);

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
        justifyContent: "center",
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
            gutterBottom
            sx={{
              fontWeight: 600,
              textAlign: "start",
              color: theme.palette.primary.main,
            }}
          >
            Login
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: theme.palette.error[600],
            }}
          >
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
