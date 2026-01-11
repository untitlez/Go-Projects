"use server";

import { cookies } from "next/headers";

export const setCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("Authorization", token, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
};

export const clearCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set("Authorization", "", {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
  });
};

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("Authorization")?.value;
};
