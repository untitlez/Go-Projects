"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError } from "@/components/ui/field";

interface ProfileDetailTextareaProps {
  name: string;
}

export const ProfileDetailTextarea = ({ name }: ProfileDetailTextareaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Textarea
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder={field.value}
            className="min-h-[120px]"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
