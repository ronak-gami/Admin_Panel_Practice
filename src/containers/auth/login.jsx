import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CustomInput from "../../shared/CustomInput";
import { loginValidationSchema } from "../../utils/helper";
import Button from "../../shared/CustomButton";
import { api } from "../../api";
import { setHeaders } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData, setToken } from "../../redux/slices/auth.slice";
import { URLS } from "../../constants/urls";
import { COLORS } from "../../utils/colors";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
      console.error("❌ Login error", error?.message);
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
              color: COLORS.primary,
            }}
          >
            Login
          </Typography>
          <Form
            handleSubmit={handleSubmit(handleLogin)}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack gap={2}>
              <FormGroup
                {...{
                  label: "Email",
                  name: "email",
                  register,
                  error: errors["email"],
                  placeholder: "Enter your email",
                  type: "email",
                  startAdornment: <MailOutlineIcon />,
                }}
              />
              <FormGroup
                {...{
                  label: "Password",
                  name: "password",
                  register,
                  error: errors["password"],
                  placeholder: "Enter your password",
                  type: "password",
                  startAdornment: <LockOutlinedIcon />,
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
