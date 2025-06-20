import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../../../utils/helper";
import { api } from "../../../api";
import { URLS } from "../../../constants/urls";
import useApi from "../../../hooks/use-api";

const useRegister = () => {
  const navigate = useNavigate();
  const { error, loading, callApi } = useApi(api.USERS.create);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const handleRegister = (formData) => {
    callApi({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "user",
      },
    });
    if (!error) {
      navigate(URLS.LOGIN);
    }
  };

  return {
    loading,
    error,
    register,
    handleSubmit,
    errors,
    handleRegister,
  };
};

export default useRegister;
