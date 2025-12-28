"use client";

import { useState } from "react";

import { useStoreAuth } from "../store/store-auth";
import { authSession } from "../axios-auth";
import { sessionType } from "@/validators/session.validator";

export const useSession = () => {
  const [session, setSession] = useState<sessionType | null>();
  const { setAuthorization } = useStoreAuth();

  const getSession = async () => {
    const data = await authSession();
    setSession(data);
    setAuthorization(true);

    if (!data) {
      setSession(null);
      setAuthorization(false);
      return;
    }

    return;
  };

  return { session, getSession };
};
