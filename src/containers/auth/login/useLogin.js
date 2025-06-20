import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginValidationSchema } from "../../../utils/helper";
import { api } from "../../../api";
import { setHeaders } from "../../../api/client";
import { setUserData, setToken } from "../../../redux/slices/auth.slice";
import { URLS } from "../../../constants/urls";
import useApi from "../../../hooks/use-api";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, loading, callApi } = useApi(api.AUTH.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const handleLogin = (formData) => {
    callApi({ data: { email: formData.email, password: formData.password } });

    if (data?.data?.user && data?.data?.token) {
      localStorage.setItem("token", data?.data?.token);
      dispatch(setUserData(data?.data?.user));
      dispatch(setToken(data?.data?.token));
      setHeaders("Authorization", `Bearer ${data?.data?.token}`);
      navigate(URLS.DASHBOARD);
    } else {
      throw new Error("Invalid response from server. Please try again.");
    }
  };

  return {
    loading,
    error,
    register,
    handleSubmit,
    errors,
    handleLogin,
    navigate,
    URLS,
  };
};

export default useLogin;
