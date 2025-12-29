"use server";

import { Config } from "@/lib/config";

import { getToken } from "./cookie";

export const fetchSession = async () => {
  try {
    const token = await getToken();
    const res = await fetch(Config.API_URL + Config.SERVICES.AUTH.SESSION, {
      headers: { Authorization: "Bearer " + token },
      cache: "no-store",
    });
    const json = await res.json();

    if (!json.success) throw new Error(json.error);

    return json.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
