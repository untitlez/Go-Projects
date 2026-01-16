"use server";

import { Config } from "@/lib/config";

export const fetchGatewayService = async () => {
  await fetch(Config.API_URL + Config.SERVICES.AUTH.ALL_LIMIT + 10);
  return "OK";
};

export const fetchUserService = async () => {
  await fetch(
    Config.API_URL_SERVICES.USER + Config.SERVICES.USER + "?limit=" + 1
  );
  return "OK";
};

export const fetchProfileService = async () => {
  await fetch(
    Config.API_URL_SERVICES.PROFILE + Config.SERVICES.PROFILE + "?limit=" + 1
  );
  return "OK";
};
