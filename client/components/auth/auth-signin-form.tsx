"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Routes } from "@/lib/routes";
import { useStoreAuth } from "@/lib/use-client/store/store-auth";
import { authSignin, authSignout } from "@/lib/use-client/axios-auth";
import { authSchema, authType } from "@/validators/account.validator";
import { sessionType } from "@/validators/session.validator";

import { SigninFormInput } from "./auth-signin-form-input";
import { AuthGoogleProvider } from "./auth-google-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";

interface AuthSigninFormProps {
  session?: sessionType;
}

export const AuthSigninForm = ({ session }: AuthSigninFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { account, setAccount } = useStoreAuth();
  const router = useRouter();

  const form = useForm<authType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSignin = async (formData: authType) => {
    await authSignin(formData);
    setAccount({ username: "", password: "" });
    form.reset();
    router.refresh();
  };

  const onSignout = async () => {
    setLoading(true);
    await authSignout();
    setLoading(false);
    form.reset();
    router.refresh();
  };

  const onFill = () => {
    form.setValue("username", account.username, { shouldDirty: true });
    form.setValue("password", account.password, { shouldDirty: true });
  };

  useEffect(() => {
    onFill();
  }, [account]);

  return (
    <Card className="relative overflow-hidden h-full w-full p-0">
      <CardContent className="p-6 md:p-8">
        {/* sign out  */}
        {session ? (
          <div className="absolute inset-0 grid place-items-center">
            <Button
              className="btn capitalize"
              disabled={loading}
              onClick={onSignout}
            >
              sign out
            </Button>
          </div>
        ) : (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSignin)}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold">
                    Sign in to your account
                  </h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your username below to sign in to your account
                  </p>
                </div>

                {/* username input */}
                <SigninFormInput
                  name="username"
                  type="text"
                  placeholder="m@example.com"
                />

                {/* password input */}
                <div className="relative">
                  <Link
                    href="#"
                    className="absolute right-0 text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                  <SigninFormInput
                    name="password"
                    type="password"
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>

                {/* submit */}
                <Field>
                  <Button
                    type="submit"
                    className="btn capitalize"
                    disabled={
                      !form.formState.isDirty || form.formState.isSubmitting
                    }
                  >
                    {form.formState.isSubmitting ? <Spinner /> : "sign in"}
                  </Button>
                </Field>

                {/* other signin  */}
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>
                <Field>
                  <AuthGoogleProvider />
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                      href={Routes.auth.signup}
                      className="underline underline-offset-4 capitalize"
                    >
                      create account
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </FormProvider>
        )}
      </CardContent>
    </Card>
  );
};
