"use client";

import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import { Config } from "@/lib/config";
import { profileUpdateType } from "@/validators/profile.validator";

interface ApiErrorResponse {
  success: boolean;
  error: string;
}

//
// GET ALL
export const getProfiles = async (limit?: string) => {
  try {
    const { data } = await axios.get(
      Config.API_URL + Config.SERVICES.PROFILE.ALL_LIMIT + limit,
      { withCredentials: true }
    );

    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch {
    return null;
  }
};

//
// GET BY ID
export const getProfile = async (id: string) => {
  try {
    const { data } = await axios.get(
      Config.API_URL + Config.SERVICES.PROFILE.LIST + id,
      { withCredentials: true }
    );

    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch {
    return null;
  }
};

//
// UPDATE
export const updateProfile = async (id: string, body: profileUpdateType) => {
  try {
    const { data } = await axios.put(
      Config.API_URL + Config.SERVICES.PROFILE.LIST + id,
      body,
      { withCredentials: true }
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
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.PROFILE.UPLOAD,
      body,
      { withCredentials: true }
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

//
// REMOVE UPLOAD
export const RemoveUploadImage = async (body: FormData | undefined) => {
  try {
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.PROFILE.REMOVE_UPLOAD,
      body,
      { withCredentials: true }
    );

    if (!data.success) throw new Error(data.error);
    return;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const msg = error.response?.data?.error || error.message;
    toast.error(msg);
    return null;
  }
};
