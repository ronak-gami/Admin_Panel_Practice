import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { assignTaskSchema, priorityOptions } from "../../utils/helper";

export const useAssignTasks = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assignTaskSchema),
  });
  return register, handleSubmit, reset, errors, priorityOptions;
};
