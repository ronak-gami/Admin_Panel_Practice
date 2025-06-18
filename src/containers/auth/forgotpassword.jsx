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
import Button from "../../shared/custom-button";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { COLORS } from "../../utils/colors";
import { emailSchema, passwordSchema } from "../../utils/helper";
import theme from "../../theme";
import Form from "../../shared/form";
import FormGroup from "../../shared/form-group";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(state ? passwordSchema : emailSchema),
  });

  const emailVerify = async (data) => {
    try {
      const response = await api.USERS.get_all();
      const user = Object.values(response.data).find(
        (user) => user.email === data.email
      );
      setMessage("Please enter your new password below.");
      setState(!!user);
      setUser(user);
    } catch (error) {
      console.error("error during verify email", error);
    }
  };

  const handleForgotPassword = async (data) => {
    try {
      const response = await api.USERS.update({
        id: user.id,
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: data.password,
          role: user.role,
        },
      });
      if (response?.data) {
        setMessage(
          "Your password has been successfully updated! You can now log in with your new password."
        );
        reset();
      }
    } catch {
      setMessage("Oops! We couldn't update your password. Please try again");
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            borderRadius: 3,
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 2,
              color: COLORS.NEUTRAL.dark,
            }}
          >
            {/*  } */}
            {message ||
              "Please wait while we check if your email is in our records..."}
          </Typography>
          <Form
            handleSubmit={handleSubmit(
              state ? handleForgotPassword : emailVerify
            )}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack gap={2}>
              {state ? (
                <>
                  <FormGroup
                    {...{
                      fullWidth: true,
                      label: "New Password",
                      name: "password",
                      register,
                      error: errors["password"],
                      placeholder: "Enter new password",
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
                      placeholder: "Confirm new password",
                      type: "password",
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              ) : (
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
              )}

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(URLS.LOGIN)}
                >
                  Back to Login
                </Button>
                <Button variant="contained" type="submit" fullWidth>
                  Reset Password
                </Button>
              </Box>
            </Stack>
          </Form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
