"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Cake, IdCard, Mail, MapPin, Phone, UserCircle } from "lucide-react";

import { updateProfile } from "@/lib/use-client/axios-profile";
import { useProfileById } from "@/lib/use-client/hook/use-profile";
import { profileUpdateType } from "@/validators/profile.validator";

import { ProfileDetailInput } from "./profile-detail-input";
import { ProfileDetailRadio } from "./profile-detail-radio";
import { ProfileDetailTextarea } from "./profile-detail-textarea";
import { ProfileDetailCalendar } from "./profile-detail-calendar";
import { ProfileDetailSubmit } from "./profile-detail-submit";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export const ProfileDetail = () => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>();

  const { id } = useParams<{ id: string }>();
  const { profile, getProfileById } = useProfileById(id);

  const values = {
    full_name: profile?.full_name || "",
    gender: profile?.gender || "",
    email: profile?.email || "",
    address: profile?.address || "",
    phone: profile?.phone || "",
    citizen_id: profile?.citizen_id || "",
    birth_date: profile?.birth_date || "",
  };

  const form = useForm<profileUpdateType>({
    defaultValues: values,
  });

  const onSubmit = async (formData: profileUpdateType) => {
    const id = String(profile?.id);
    await updateProfile(id, formData);
    setOpenDialog(false);
    setEdit(false);
    getProfileById();
  };

  useEffect(() => {
    form.reset(values);
    if (profile) return;
    getProfileById();
  }, [profile]);

  const items = [
    {
      icon: IdCard,
      name: "full_name",
      title: "fullName",
      type: "text",
      description: profile?.full_name || "no data",
    },
    {
      icon: UserCircle,
      name: "gender",
      title: "gender",
      type: "radio",
      description: profile?.gender || "no data",
    },
    {
      icon: Cake,
      name: "birth_date",
      title: "birthDate",
      type: "date",
      description: profile?.birth_date
        ? new Date(profile.birth_date).toLocaleDateString()
        : "no data",
    },
    {
      icon: Mail,
      name: "email",
      title: "email",
      type: "text",
      description: profile?.email || "no data",
    },
    {
      icon: MapPin,
      name: "address",
      title: "address",
      type: "textarea",
      description: profile?.address || "no data",
    },
    {
      icon: Phone,
      name: "phone",
      title: "phone",
      type: "text",
      description: profile?.phone || "no data",
    },
  ] as const;

  return (
    <Card className="w-full h-full overflow-hidden bg-transparent">
      <CardContent className="p-6 md:p-8">
        <FormProvider {...form}>
          <form className="flex flex-col gap-4 lg:gap-6">
            {items.map((item, i) => (
              <Item key={i} variant="outline">
                <ItemMedia variant="icon">
                  {item.icon && <item.icon />}
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="capitalize">{item.title}</ItemTitle>
                  {/* Input  */}
                  {edit ? (
                    <div>
                      {/* Input Text  */}
                      {item.type === "text" && (
                        <ProfileDetailInput name={item.name} type={item.type} />
                      )}

                      {/* Input Radio  */}
                      {item.type === "radio" && (
                        <ProfileDetailRadio name={item.name} />
                      )}

                      {/* Input Textarea  */}
                      {item.type === "textarea" && (
                        <ProfileDetailTextarea name={item.name} />
                      )}

                      {/* Input Date  */}
                      {item.type === "date" && (
                        <ProfileDetailCalendar name={item.name} />
                      )}
                    </div>
                  ) : (
                    <ItemDescription className="capitalize">
                      {item.description}
                    </ItemDescription>
                  )}
                </ItemContent>
              </Item>
            ))}

            {/* BUTTON SUBMIT */}
            {edit ? (
              <ProfileDetailSubmit
                onSubmit={onSubmit}
                edit={edit}
                setEdit={setEdit}
              />
            ) : (
              // BUTTON EDIT
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="btn capitalize border"
                  onClick={() => setEdit(!edit)}
                >
                  edit profile
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
