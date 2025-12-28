"use server";

import { Config } from "@/lib/config";

export const fetchAccounts = async (limit?: string) => {
  try {
    const res = await fetch(
      Config.API_URL + Config.SERVICES.AUTH.ALL_LIMIT + limit,
      { cache: "no-store" }
    );
    const json = await res.json();

    if (!json.success) throw new Error(json.error);

    return json.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
