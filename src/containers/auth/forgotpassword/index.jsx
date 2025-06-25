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
import theme from "../../../theme";
import useForgotPassword from "./useForgotPassword";
import Snackbar from "../../../shared/custom-snackbar";

const ForgotPassword = () => {
  const {
    loading,
    feedback,
    isEmailVerified,
    register,
    handleSubmit,
    errors,
    onSubmit,
    navigate,
    URLS,
    showSnack,
  } = useForgotPassword();

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
            alignItems: "center",
            width: "100%",
            borderRadius: 3,
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, color: theme.palette.primary.main }}
          >
            Forgot Password
          </Typography>

          <Typography
            variant="body1"
            color="neutral.dark"
            sx={{ textAlign: "center", mb: 2 }}
          >
            {feedback}
          </Typography>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack gap={2}>
              {isEmailVerified ? (
                <>
                  <FormGroup
                    {...{
                      fullWidth: true,
                      label: "New Password",
                      name: "password",
                      register,
                      error: errors.password,
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
                      error: errors.confirmPassword,
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
                <>
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
                </>
              )}

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  disabled={loading}
                  onClick={() => navigate(URLS.LOGIN)}
                >
                  Back to Login
                </Button>
                <Button
                  loading={loading}
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  {isEmailVerified ? "Reset Password" : "Verify Email"}
                </Button>
              </Box>
            </Stack>
          </Form>
        </Paper>
        {console.log("-----------showSnack-----------", showSnack)}
        <Snackbar
          message={showSnack.message}
          stateChange={showSnack.flag}
          type={showSnack.type}
        />
      </Box>
    </Container>
  );
};

export default ForgotPassword;
