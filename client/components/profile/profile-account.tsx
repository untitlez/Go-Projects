"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { KeyRound, User2 } from "lucide-react";

import { updataUser } from "@/lib/use-client/axios-user";
import { userType, userUpdateType } from "@/validators/user.validator";

import { ProfileAccountSubmit } from "./profile-account-submit";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface ProfileAccountProps {
  data: {
    user?: userType;
  };
}

export const ProfileAccount = ({ data }: ProfileAccountProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>();
  const [edit, setEdit] = useState(false);

  const router = useRouter();
  const { user } = data;

  const values = {
    username: user?.username,
    password: user?.password,
  };

  const form = useForm<userUpdateType>({
    defaultValues: values,
  });

  const onSubmit = async (formData: userUpdateType) => {
    if (!user?.id) return;
    await updataUser(user?.id, formData);
    setOpenDialog(false);
    setEdit(false);
    router.refresh();
  };

  useEffect(() => {
    form.reset(values);
    if (user) return;
  }, [user]);

  const items = [
    {
      icon: User2,
      title: "username",
      description: user?.username || "no data",
    },
    {
      icon: KeyRound,
      title: "password",
      description: user?.password || "no data",
    },
  ] as const;

  return (
    <Card className="h-full bg-muted dark:bg-card">
      <FormProvider {...form}>
        <form className="h-full flex flex-col px-4 gap-3 sm:px-6 sm:gap-4">
          {/* Input  */}
          {items.map((item, i) => (
            <Item
              key={i}
              variant="outline"
              className="bg-background rounded-xl"
            >
              <ItemMedia
                variant="icon"
                className="bg-primary/10 border-primary/50 text-primary dark:bg-muted dark:border-border"
              >
                {item.icon && <item.icon className="size-4" />}
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="dark:text-primary capitalize">
                  {item.title}
                </ItemTitle>
                {edit ? (
                  <Controller
                    name={item.title}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          autoFocus={field.name === "username"}
                          autoComplete="on"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                ) : (
                  <ItemDescription className="capitalize">
                    {item.description || ""}
                  </ItemDescription>
                )}
              </ItemContent>
            </Item>
          ))}

          {/* Submit */}
          <div className="mt-6 sm:mt-8 xl:mt-auto">
            <ProfileAccountSubmit
              onSubmit={onSubmit}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};
