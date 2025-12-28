"use client";

import { useEffect, useState } from "react";

import { getUser, getUsers } from "../axios-user";
import { userType } from "@/validators/user.validator";

//
// ALL
export const useAllUser = (limit?: string) => {
  const [allUser, setAllUser] = useState<userType[] | null>();

  const getAllUser = async () => {
    const data = await getUsers(limit);
    return setAllUser(data);
  };

  return { allUser, getAllUser };
};

//
// BY ID
export const useUserById = (id?: string) => {
  const [user, setUser] = useState<userType | null>();

  const getUserById = async () => {
    if (!id) return;
    const data = await getUser(id);
    return setUser(data);
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  return { user, getUserById };
};
