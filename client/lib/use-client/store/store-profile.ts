"use client";

import { create } from "zustand";

interface ProfileState {
  editProfile: boolean;
  setEditProfile: (value: boolean) => void;
}

export const useStoreProfile = create<ProfileState>((set) => ({
  editProfile: false,
  setEditProfile: (value) => set({ editProfile: value }),
}));
