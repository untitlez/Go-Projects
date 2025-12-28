"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";

interface ProfileDetailInputProps {
  name: string;
  type: string;
}

export const ProfileDetailInput = ({ name, type }: ProfileDetailInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Input
            {...field}
            type={name === "email" ? "email" : type}
            aria-invalid={fieldState.invalid}
            placeholder={field.value}
            autoComplete="on"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
