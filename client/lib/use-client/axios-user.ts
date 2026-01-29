"use client";

import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import { Config } from "@/lib/config";
import { userUpdateType } from "@/validators/user.validator";

interface ApiErrorResponse {
  success: boolean;
  error: string;
}

//
// UPDATE
export const updataUser = async (id: string, body: userUpdateType) => {
  try {
    const { data } = await axios.put(
      Config.API_URL + Config.SERVICES.USER.LIST + id,
      body,
      { withCredentials: true },
    );

    if (!data.success) throw new Error(data.error);
    toast.success(data.message);
    return;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const msg = error.response?.data?.error || error.message;
    toast.error(msg);
    return null;
  }
};

//
// DELETE
export const deleteUser = async (id: string) => {
  try {
    const { data } = await axios.delete(
      Config.API_URL + Config.SERVICES.USER.LIST + id,
      { withCredentials: true },
    );

    if (!data.success) throw new Error(data.error);
    toast.success(data.message);
    return;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const msg = error.response?.data?.error || error.message;
    toast.error(msg);
    return null;
  }
};

export const getAllUser = async (limit?: string) => {
  try {
    const { data } = await axios.get(
      Config.API_URL + Config.SERVICES.AUTH.ALL_LIMIT + limit,
      { withCredentials: true },
    );

    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const msg = error.response?.data?.error || error.message;
    toast.error(msg);
    return null;
  }
};
