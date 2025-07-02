import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginValidationSchema } from "../../../utils/helper";
import { api } from "../../../api";
import { setHeaders } from "../../../api/client";
import { setUserData, setToken } from "../../../redux/slices/auth.slice";
import { URLS } from "../../../constants/urls";
import apiClient from "../../../hooks/use-api";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = apiClient(api.AUTH.login);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnack, setShowSnack] = useState({
    message: "",
    type: "",
    key: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      const { data: loginResponse, error } = await userLogin({
        data: { email: formData.email, password: formData.password },
      });
      if (loginResponse?.data?.user && loginResponse?.data?.token) {
        localStorage.setItem("token", loginResponse?.data?.token);
        dispatch(setUserData(loginResponse?.data?.user));
        dispatch(setToken(loginResponse?.data?.token));
        setHeaders("Authorization", `Bearer ${loginResponse?.data?.token}`);
      } else if (error) {
        setShowSnack({
          message: error,
          type: "error",
          key: Date.now(),
        });
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
    handleLogin,
    navigate,
    URLS,
    showSnack,
  };
};

export default useLogin;
