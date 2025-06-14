import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Paper, Typography } from "@mui/material";
import CustomInput from "../../shared/custom-input";
import Button from "../../shared//custom-button";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { COLORS } from "../../utils/colors";
import { forgotPasswordSchema } from "../../utils/helper";
import theme from "../../theme";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (data) => {
    try {
      setLoading(true);
      const response = await api.AUTH.forgot_password({
        data: {
          email: data.email,
        },
      });

      if (response?.data?.success) {
        // You can add a success message here
        navigate(URLS.LOGIN);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
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
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 3,
              color: COLORS.NEUTRAL.dark,
            }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>
          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            noValidate
            style={{ width: "100%" }}
          >
            <Box flexDirection={"column"} gap={1.5} sx={{ display: "flex" }}>
              <CustomInput
                name="email"
                label="Email"
                register={register}
                errors={errors}
              />
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    backgroundColor: "transparent",
                  }}
                  size="large"
                  fullWidth
                  onClick={() => navigate(URLS.LOGIN)}
                >
                  Back to Login
                </Button>
                <Button
                  loading={loading}
                  variant="contained"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      opacity: 0.9,
                    },
                  }}
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Send Reset Link
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
