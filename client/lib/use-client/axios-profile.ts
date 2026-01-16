"use client";

import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import { Config } from "@/lib/config";
import { getToken } from "../use-server/cookie";
import { profileUpdateType } from "@/validators/profile.validator";

interface ApiErrorResponse {
  success: boolean;
  error: string;
}

//
// UPDATE
export const updateProfile = async (id: string, body: profileUpdateType) => {
  try {
    const token = await getToken();
    const { data } = await axios.put(
      Config.API_URL + Config.SERVICES.PROFILE.LIST + id,
      body,
      { headers: { Authorization: "Bearer " + token } }
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
// UPLOAD
export const uploadImage = async (body: FormData | undefined) => {
  try {
    const token = await getToken();
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.PROFILE.UPLOAD,
      body,
      { headers: { Authorization: "Bearer " + token } }
    );

    if (!data.success) throw new Error(data.error);
    return data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const msg = error.response?.data?.error || error.message;
    toast.error(msg);
    return null;
  }
};
