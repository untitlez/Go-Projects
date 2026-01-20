"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Routes } from "@/lib/routes";
import { authSignup } from "@/lib/use-client/axios-auth";
import { authType } from "@/validators/account.validator";

import { SignupFormInput } from "./auth-signup-form-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

export const AuthSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const values = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<authType>({
    defaultValues: values,
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
    <Card className="bg-transparent overflow-hidden border-none shadow-none grid place-items-center">
      <CardContent className="w-full max-w-xl sm:px-0">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSignup)}>
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
                <FieldDescription className="col-span-2">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              {/* button submit */}
              <Field className="mt-7">
                <Button
                  type="submit"
                  className="btn capitalize"
                  disabled={!form.formState.isDirty}
                >
                  {form.formState.isSubmitting ? <Spinner /> : "create account"}
                </Button>

                {/* do signin */}
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href={Routes.auth.signin}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
