"use client";

import axios from "axios";
import { Config } from "../config";

export const getImages = async (query?: string) => {
  try {
    const { data } = await axios.get(
      Config.API_URL + Config.SERVICES.AUTH.IMAGES + query,
    );
    if (!data.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
