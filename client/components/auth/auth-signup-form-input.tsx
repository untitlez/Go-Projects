"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  showPassword?: boolean;
  setShowPassword?: (value: boolean) => void;
}

export const SignupFormInput = ({
  name,
  type,
  placeholder,
  showPassword,
  setShowPassword,
}: FormInputProps) => {
  const { control, formState } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="capitalize" htmlFor={field.name}>
            {name}
          </FieldLabel>
          <InputGroup>
            {showPassword ? (
              <InputGroupInput
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder={placeholder}
                disabled={formState.isSubmitting}
                required
              />
            ) : (
              <InputGroupInput
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type={type}
                placeholder={placeholder}
                disabled={formState.isSubmitting}
                required
              />
            )}
            {type === "password" && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="sm"
                  className="cursor-pointer"
                  disabled={formState.isSubmitting}
                  onClick={() => setShowPassword?.(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
