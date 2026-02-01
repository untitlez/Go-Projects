"use server";

import { Config } from "@/lib/config";

const query = "?limit=1";

export const fetchGatewayService = async () => {
  await fetch(Config.CONNECT_SERVER.GATEWAY + query);
  return "OK";
};

export const fetchUserService = async () => {
  await fetch(Config.CONNECT_SERVER.USER + query);
  return "OK";
};

export const fetchProfileService = async () => {
  await fetch(Config.CONNECT_SERVER.PROFILE + query);
  return "OK";
};
