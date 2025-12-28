"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProfileDetailRadioProps {
  name: string;
}

export const ProfileDetailRadio = ({ name }: ProfileDetailRadioProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <RadioGroup
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            aria-invalid={fieldState.invalid}
            className="flex items-center gap-8"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                aria-invalid={fieldState.invalid}
                value="male"
                id="male"
                className="cursor-pointer"
              />
              <Label htmlFor="male" className="capitalize cursor-pointer">
                male
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                aria-invalid={fieldState.invalid}
                value="female"
                id="female"
                className="cursor-pointer"
              />
              <Label htmlFor="female" className="capitalize cursor-pointer">
                female
              </Label>
            </div>
          </RadioGroup>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
