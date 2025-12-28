"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProfileDetailCalendarProps {
  name: string;
}

export const ProfileDetailCalendar = ({ name }: ProfileDetailCalendarProps) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const formatDate = (value: Date) => {
    return new Date(value).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date" className="w-full btn">
              {field.value ? formatDate(field.value) : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="center">
            <Field data-invalid={fieldState.invalid}>
              <Calendar
                mode="single"
                selected={field.value}
                captionLayout="dropdown-years"
                className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                onSelect={(day) => {
                  field.onChange(day);
                  setOpen(false);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </PopoverContent>
        </Popover>
      )}
    />
  );
};
