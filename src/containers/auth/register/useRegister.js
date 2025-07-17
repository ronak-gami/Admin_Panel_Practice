import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../../../utils/helper";
import { api } from "../../../api";
import { URLS } from "../../../constants/urls";
import apiClient from "../../../hooks/use-api";
import { useState } from "react";

const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSnack, setShowSnack] = useState({
    message: "",
    type: "",
    key: "",
  });
  const userRegister = apiClient(api.AUTH.register);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const handleRegister = async (formData) => {
    setIsLoading(true);
    try {
      const registerData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "user",
      };
      const { data: registerResponse } = await userRegister({
        data: registerData,
      });
      console.log("registerResponse: ", registerResponse?.data);
      if (registerResponse?.data?.status === true) {
        setShowSnack({
          message: "Registration Successful",
          type: "success",
          key: Date.now(),
        });
        setTimeout(() => {
          navigate(URLS.LOGIN);
        }, 2500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loading: isLoading,
    register,
    handleSubmit,
    errors,
    handleRegister,
    showSnack,
  };
};

export default useRegister;
