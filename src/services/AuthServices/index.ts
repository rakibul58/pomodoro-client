/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      const cookieStore = cookies();
      (await cookieStore).set("accessToken", data?.data?.accessToken);
      (await cookieStore).set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      const cookieStore = cookies();
      (await cookieStore).set("accessToken", data?.data?.accessToken);
      (await cookieStore).set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error("Failed to get new access token", error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    const { data } = await getUserProfile();

    return {
      ...data,
    };
  }

  return decodedToken;
};

export const changePassword = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/change-password", payload);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateProfile = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.put("/users/profile", payload);
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw new Error(error);
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await axiosInstance.get("/users/profile");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};
