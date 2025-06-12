import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Paper, Typography } from "@mui/material";
import CustomInput from "../../shared/CustomInput";
import Button from "../../shared/CustomButton";
import { registerValidationSchema } from "../../utils/helper";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
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

  const handleRegister = (data) => {
    try {
      setLoading(true);
      const payLoad = {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password,
        role: "user",
      };
      const response = api.USERS.create({ data: payLoad });
      console.log("Registration Successful", response);
      navigate(URLS.LOGIN);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      disableGutters
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
        }}
      >
        <Paper
          elevation={12}
          sx={{
            padding: 4,
            width: 600,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
            }}
          >
            Register
          </Typography>
          <form
            onSubmit={handleSubmit(handleRegister)}
            noValidate
            style={{ width: "100%" }}
          >
            <Box flexDirection={"column"} gap={1.2} sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <CustomInput
                  name="firstname"
                  label="First Name"
                  register={register}
                  errors={errors}
                />
                <CustomInput
                  name="lastname"
                  label="Last Name"
                  register={register}
                  errors={errors}
                />
              </Box>

              <CustomInput
                name="email"
                label="Email"
                register={register}
                errors={errors}
              />
              <CustomInput
                name="password"
                label="Password"
                register={register}
                errors={errors}
                password
              />
              <CustomInput
                name="confirmPassword"
                label="Confirm Password"
                register={register}
                errors={errors}
                password
              />
              <Button
                loading={loading}
                variant="contained"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  mt: 2,
                }}
                size="large"
                type="submit"
                fullWidth
              >
                Register
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
