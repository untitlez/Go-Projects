"use client";

import React from "react";

import { useStoreAuth } from "@/lib/use-client/store/store-auth";

import { UnauthorizedPage } from "./unauthorized-page";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { authorization } = useStoreAuth();

  if (!authorization) return <UnauthorizedPage />;

  return <>{children}</>;
};
