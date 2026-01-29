"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LoadingPage from "@/app/(pages)/loading";
import { Routes } from "@/lib/routes";
import { authSigninWithGoogleVerify } from "@/lib/use-client/axios-auth";

export const AuthGoogleProviderVerify = () => {
  const router = useRouter();

  const signinVerify = async () => {
    const hash = window.location.hash.slice(1);
    const searchParams = new URLSearchParams(hash);
    const code = searchParams.get("callback");

    if (!code) return router.back;

    await authSigninWithGoogleVerify(code);
    router.replace(Routes.auth.signin_verify);
    return router.push(Routes.auth.signin);
  };

  useEffect(() => {
    signinVerify();
  }, []);

  return <LoadingPage />;
};
