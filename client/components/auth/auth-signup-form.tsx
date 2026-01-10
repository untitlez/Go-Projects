"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Routes } from "@/lib/routes";
import { authSignup } from "@/lib/use-client/axios-auth";
import { authType } from "@/validators/account.validator";

import { SignupFormInput } from "./auth-signup-form-input";
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

export const AuthSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<authType>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSignup = async (formData: authType) => {
    if (form.watch("password") !== form.watch("confirmPassword")) {
      form.setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }
    await authSignup(formData);
    setTimeout(() => router.push(Routes.auth.signin), 1000);
  };

  return (
    <Card className="overflow-hidden w-full h-full p-0 flex flex-col gap-6 lg:rounded-r-none z-10">
      <CardContent>
        <FormProvider {...form}>
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSignup)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>

              {/* username input */}
              <SignupFormInput
                name="username"
                type="text"
                placeholder="m@example.com"
              />

              {/* password input */}
              <Field className="grid grid-cols-2 gap-4">
                <SignupFormInput
                  name="password"
                  type="password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <SignupFormInput
                  name="confirmPassword"
                  type="password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </Field>
              <FieldDescription className="-mt-4">
                Must be at least 8 characters long.
              </FieldDescription>

              {/* button submit */}
              <Field>
                <Button
                  type="submit"
                  className="btn capitalize"
                  disabled={!form.formState.isDirty}
                >
                  {form.formState.isSubmitting ? <Spinner /> : "create account"}
                </Button>
              </Field>

              {/* other signin */}
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <AuthGoogleProvider />
              </Field>

              {/* back to signin */}
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href={Routes.auth.signin}>Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
