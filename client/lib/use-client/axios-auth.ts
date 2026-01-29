"use client";

import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { Config } from "@/lib/config";
import { authType } from "@/validators/account.validator";
import { sessionType } from "@/validators/session.validator";
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
// SIGN IN
export const authSignin = async (body: authType) => {
  try {
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.AUTH.SIGNIN,
      body,
      { withCredentials: true },
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
// SIGN IN WITH GOOGLE
export const authSigninWithGoogle = async () => {
  try {
    const { data } = await axios.get(
      Config.API_URL + Config.SERVICES.AUTH.GOOGLE,
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

//
// SIGN IN WITH GOOGLE VERIFY
export const authSigninWithGoogleVerify = async (code: string) => {
  try {
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.AUTH.GOOGLE_VERIFY,
      { code: code },
      { withCredentials: true },
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
export const authSignout = async (body: sessionType) => {
  try {
    const req = { id: body.id, role: body.role };
    const { data } = await axios.post(
      Config.API_URL + Config.SERVICES.AUTH.SIGNOUT,
      req,
      { withCredentials: true },
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
      { withCredentials: true },
    );

    if (!data.success) throw new Error(data.error);
    return data.data;
  } catch {
    return null;
  }
};
