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
  const userRegister = apiClient(api.USERS.create);
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
      const { data: registerResponse } = await userRegister({
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: "user",
        },
      });
      if (registerResponse?.data) {
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
