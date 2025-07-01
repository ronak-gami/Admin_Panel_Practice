import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { emailSchema, passwordSchema } from "../../../utils/helper";
import { api } from "../../../api";
import { URLS } from "../../../constants/urls";
import apiClient from "../../../hooks/use-api";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(
    "Please enter your email to verify your account."
  );
  const [showSnack, setShowSnack] = useState({
    message: "",
    type: "",
    key: "",
  });

  const getAllUsers = apiClient(api.USERS.get_all);
  const updateUser = apiClient(api.USERS.update);

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

  const handleEmailVerify = async (formData) => {
    setFeedback("Verifying your email...");
    setIsLoading(true);
    try {
      const { data: allUsersResponse, error } = await getAllUsers();

      if (error) {
        setShowSnack({ message: error, type: "error", key: Date.now() });
        return;
      }

      if (allUsersResponse && allUsersResponse.data) {
        const user = Object.values(allUsersResponse.data).find(
          (u) => u.email === formData.email
        );

        if (user) {
          setVerifiedUser(user);
          setIsEmailVerified(true);
          setFeedback("Please enter your new password.");
          setShowSnack({
            message: "Your email is verified successfully",
            type: "success",
            key: Date.now(),
          });
        } else {
          setShowSnack({
            message: "This email is not registered with us.",
            type: "error",
            key: Date.now(),
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (formData) => {
    setFeedback("Updating your password...");
    setIsLoading(true);
    try {
      const { data: updateUsersResponse, error } = await updateUser({
        id: verifiedUser.id,
        data: { ...verifiedUser, password: formData.password },
      });

      if (error) {
        console.error("Error in handlePasswordReset", error);
        return;
      }
      if (updateUsersResponse && updateUsersResponse.data) {
        setShowSnack({
          message: "Password updated successfully!",
          type: "success",
          key: Date.now(),
        });
        reset();
      }
    } finally {
      setFeedback("Now, you can login with your new credentials.");
      setIsLoading(false);
    }
  };

  const onSubmit = isEmailVerified ? handlePasswordReset : handleEmailVerify;

  return {
    loading: isLoading,
    feedback,
    isEmailVerified,
    register,
    handleSubmit,
    errors,
    onSubmit,
    navigate,
    URLS,
    showSnack,
  };
};

export default useForgotPassword;
