/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  loginUser,
  registerUser,
  updateProfile,
} from "@/services/AuthServices";
import { toast } from "sonner";

export const useUserLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error("Login Failed. Please Provide Valid Email and Password.");
    },
  });
};

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["User_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User Registration successful.");
    },
    onError: (error) => {
      toast.error("Registration Failed. Please Provide Valid Information.");
    },
  });
};

export const useUserChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_CHANGE_PASSWORD"],
    mutationFn: async (payload) => await changePassword(payload),
    onSuccess: () => {
      toast.success("Password changed successfully.");
    },
    onError: (error) => {
      toast.error("Provide correct password.");
    },
  });
};

export const useUpdateUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (payload) => await updateProfile(payload),
    onSuccess: () => {
      toast.success("Customer Updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to Update Customer.");
    },
  });
};
