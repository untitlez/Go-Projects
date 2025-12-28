"use client";

import { authType } from "@/validators/account.validator";
import { create } from "zustand";

export interface useStoreAuthType {
  account: authType;
  setAccount: (value: authType) => void;

  authorization: boolean;
  setAuthorization: (value: boolean) => void;
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

  authorization: false,
  setAuthorization: (value) => set({ authorization: value }),
}));
