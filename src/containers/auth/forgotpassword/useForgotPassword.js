import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { emailSchema, passwordSchema } from "../../../utils/helper";
import { api } from "../../../api";
import { URLS } from "../../../constants/urls";
import useApi from "../../../hooks/use-api";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [feedback, setFeedback] = useState({
    message: "Please enter your email to verify your account.",
    type: "info",
  });
  const [showSnack, setShowSnack] = useState({
    flag: false,
    message: "",
    type: "",
  });
  const {
    data: allUsersData,
    loading: loading_getAllUsers,
    callApi: callApi_getAllUsers,
  } = useApi(api.USERS.get_all);
  const { callApi: callApi_updateUsers } = useApi(api.USERS.update);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isEmailVerified ? passwordSchema : emailSchema),
    context: { isEmailVerified },
  });

  useEffect(() => {
    reset();
  }, [isEmailVerified, reset]);

  const handleEmailVerify = (formData) => {
    setFeedback({ message: "Verifying your email...", type: "info" });
    callApi_getAllUsers();
    const user = Object.values(allUsersData.data).find(
      (u) => u.email === formData.email
    );

    if (user) {
      setVerifiedUser(user);
      setIsEmailVerified(true);
      setFeedback({
        message: "Email verified. Please enter your new password.",
        type: "success",
      });
      setShowSnack({
        flag: true,
        message: "Your email is verified successfully",
        type: "success",
      });
    } else {
      setFeedback({
        message: "This email is not registered with us.",
        type: "error",
      });
    }
  };

  const handlePasswordReset = (formData) => {
    setFeedback({ message: "Updating your password...", type: "info" });
    callApi_updateUsers({
      id: verifiedUser.id,
      data: { ...verifiedUser, password: formData.password },
    });

    setShowSnack({
      flag: true,
      message: "Password updated successfully! You can now log in.",
      type: "success",
    });
    reset();
  };

  const getFeedbackColor = () => {
    if (feedback.type === "error") return "error.main";
    if (feedback.type === "success") return "success.main";
    return "neutral.dark";
  };

  const onSubmit = isEmailVerified ? handlePasswordReset : handleEmailVerify;

  return {
    loading_getAllUsers,
    feedback,
    isEmailVerified,
    register,
    handleSubmit,
    errors,
    onSubmit,
    navigate,
    URLS,
    getFeedbackColor,
    showSnack,
  };
};

export default useForgotPassword;
