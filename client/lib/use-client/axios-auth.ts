"use client";

import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import { Config } from "@/lib/config";
import { authType } from "@/validators/account.validator";
import { clearCookie, setCookie } from "../use-server/cookie";

interface ApiErrorResponse {
  success: boolean;
  error: string;
}

//
// SIGN UP
export const authSignup = async (body: authType) => {
  try {
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.AUTH.SIGNUP,
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
// SIGN IN
export const authSignin = async (body: authType) => {
  try {
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.AUTH.SIGNIN,
      body,
      { withCredentials: true }
    );

    if (!data.success) throw new Error(data.error);
    await setCookie(data.data);
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
// SIGN OUT
export const authSignout = async () => {
  try {
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.AUTH.SIGNOUT,
      {},
      { withCredentials: true }
    );

    if (!data.success) throw new Error(data.error);
    await clearCookie();
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
// SESSION
export const authSession = async () => {
  try {
    const { data } = await axios.get(
      Config.API_URL + Config.SERVICES.AUTH.SESSION,
      { withCredentials: true }
    );

    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch {
    return null;
  }
};
