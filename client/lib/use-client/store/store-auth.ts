"use client";

import { authType } from "@/validators/account.validator";
import { create } from "zustand";

export interface useStoreAuthType {
  account: authType;
  setAccount: (value: authType) => void;
}

export const useStoreAuth = create<useStoreAuthType>((set) => ({
  account: {
    username: "",
    password: "",
  },
  setAccount: (value) =>
    set({
      account: {
        username: value.username,
        password: value.password,
      },
    }),
}));
