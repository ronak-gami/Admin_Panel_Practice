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
import Button from "../../shared/custom-button";
import { registerValidationSchema } from "../../utils/helper";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import theme from "../../theme";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      const payLoad = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "user",
      };
      await api.USERS.create({ data: payLoad });
      navigate(URLS.LOGIN);
    } catch (error) {
      console.error("Registration failed:", error);
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
            Register
          </Typography>
          <Form
            handleSubmit={handleSubmit(handleRegister)}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack gap={1.5}>
              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <FormGroup
                  sx={{ width: "100%" }}
                  {...{
                    label: "First Name",
                    name: "firstName",
                    register,
                    error: errors["firstName"],
                    placeholder: "ronak",
                    type: "text",
                  }}
                />
                <FormGroup
                  sx={{ width: "100%" }}
                  {...{
                    label: "Last Name",
                    name: "lastName",
                    register,
                    error: errors["lastName"],
                    placeholder: "gami",
                    type: "text",
                  }}
                />
              </Box>
              <FormGroup
                {...{
                  fullWidth: true,
                  label: "Email",
                  name: "email",
                  register,
                  error: errors["email"],
                  placeholder: "Enter your email",
                  type: "email",
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
              <FormGroup
                {...{
                  fullWidth: true,
                  label: "Confirm Password",
                  name: "confirmPassword",
                  register,
                  error: errors["confirmPassword"],
                  placeholder: "Enter your confirm password",
                  type: "password",
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button loading={loading} variant="contained" type="submit">
                Register
              </Button>
            </Stack>
          </Form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
