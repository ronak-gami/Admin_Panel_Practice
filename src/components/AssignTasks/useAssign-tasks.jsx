import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { assignTaskSchema, priorityOptions } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../redux/slices/data.slice";

export const useAssignTasks = () => {
  const users = useSelector((state) => state.data.users);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { assignedTo: [] },
    resolver: yupResolver(assignTaskSchema),
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userFullNames = users
    .filter((user) => user.role === "user")
    .map((user) => {
      const fullName =
        `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ` +
        `${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`;
      const id = user.id || "";
      return {
        value: fullName,
        label: fullName,
        id: id,
      };
    });

  const handleAssignTasks = (data) => {
    console.log("Assigned Tasks Data: ", data);
  };

  return {
    register,
    handleSubmit,
    reset,
    errors,
    priorityOptions,
    userFullNames,
    setValue,
    watch,
    handleAssignTasks,
  };
};
