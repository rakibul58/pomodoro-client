/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const logFocusSession = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/focus-sessions/start", payload);
    return data;
  } catch (error: any) {
        console.log(error.response);
    throw new Error(error);
  }
};

export const focusMetrics = async () => {
  try {
    const { data } = await axiosInstance.get("/focus-sessions/metrics");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getDashboard = async () => {
  try {
    const { data } = await axiosInstance.get("/focus-sessions/dashboard");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

