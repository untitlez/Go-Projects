"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { KeyRound, User2 } from "lucide-react";

import { updataUser } from "@/lib/use-client/axios-user";
import { userType, userUpdateType } from "@/validators/user.validator";

import { ProfileAccountSubmit } from "./profile-account-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface ProfileAccountProps {
  user?: userType;
}

export const ProfileAccount = ({ user }: ProfileAccountProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>();
  const [edit, setEdit] = useState(false);

  const router = useRouter();

  const values = {
    username: user?.username || "",
    password: user?.password || "",
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
    <Card className="w-full overflow-hidden dark:bg-card/20">
      <CardContent className="h-full p-6 md:p-8 space-y-4">
        <FormProvider {...form}>
          <form className="flex flex-col gap-4 lg:gap-6">
            {/* Input  */}
            {items.map((item, i) => (
              <Item key={i} variant="outline" className="dark:bg-card/50">
                <ItemMedia variant="icon">
                  {item.icon && <item.icon />}
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="capitalize">{item.title}</ItemTitle>
                  {edit ? (
                    <Controller
                      name={item.title}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            autoComplete="on"
                            autoFocus
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  ) : (
                    <ItemDescription className="capitalize">
                      {item.description}
                    </ItemDescription>
                  )}
                </ItemContent>
              </Item>
            ))}

            {edit ? (
              <ProfileAccountSubmit
                onSubmit={onSubmit}
                edit={edit}
                setEdit={setEdit}
              />
            ) : (
              // BUTTON EDIT
              <Button
                type="button"
                variant="outline"
                className="btn capitalize"
                onClick={() => setEdit(!edit)}
              >
                edit account
              </Button>
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
