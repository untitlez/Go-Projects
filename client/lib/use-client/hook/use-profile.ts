"use client";

import { useEffect, useState } from "react";

import { getProfile, getProfiles } from "../axios-profile";
import { profileType } from "@/validators/profile.validator";

//
// ALL
export const useAllProfile = (limit?: string) => {
  const [allProfile, setAllProfile] = useState<profileType[] | null>();

  const getAllProfile = async () => {
    const data = await getProfiles(limit);
    return setAllProfile(data);
  };

  return { allProfile, getAllProfile };
};

//
// BY ID
export const useProfileById = (id?: string) => {
  const [profile, setProfile] = useState<profileType | null>();

  const getProfileById = async () => {
    if (!id) return;
    const data = await getProfile(id);
    return setProfile(data);
  };

  useEffect(() => {
    getProfileById();
  }, [id]);

  return { profile, getProfileById };
};
