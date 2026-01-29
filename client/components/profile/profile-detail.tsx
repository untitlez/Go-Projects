"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Cake, IdCard, Mail, MapPin, Phone, UserCircle } from "lucide-react";

import { updateProfile } from "@/lib/use-client/axios-profile";
import { profileType, profileUpdateType } from "@/validators/profile.validator";

import { ProfileDetailInput } from "./profile-detail-input";
import { ProfileDetailRadio } from "./profile-detail-radio";
import { ProfileDetailTextarea } from "./profile-detail-textarea";
import { ProfileDetailCalendar } from "./profile-detail-calendar";
import { ProfileDetailSubmit } from "./profile-detail-submit";

import { Card } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface ProfileDetailProps {
  data: {
    profile?: profileType;
  };
}

export const ProfileDetail = ({ data }: ProfileDetailProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [edit, setEdit] = useState(false);

  const router = useRouter();
  const { profile } = data;

  const values = {
    full_name: profile?.full_name,
    first_name: profile?.first_name,
    last_name: profile?.last_name,
    gender: profile?.gender,
    email: profile?.email,
    address: profile?.address,
    phone: profile?.phone,
    birth_date: profile?.birth_date,
  };

  const form = useForm<profileUpdateType>({
    defaultValues: values,
  });

  const onSubmit = async (formData: profileUpdateType) => {
    if (!profile?.id) return;
    await updateProfile(profile?.id, formData);
    setOpenDialog(false);
    setEdit(false);
    router.refresh();
  };

  useEffect(() => {
    form.reset(values);
    if (profile) return;
  }, [profile]);

  const items = [
    {
      icon: IdCard,
      name: "full_name",
      title: "full name",
      type: "text",
      description: profile?.full_name || "no data",
      show: edit,
    },
    {
      icon: IdCard,
      name: "first_name",
      title: "first name",
      type: "text",
      description: profile?.first_name || "no data",
      show: !edit,
    },
    {
      icon: IdCard,
      name: "last_name",
      title: "last name",
      type: "text",
      description: profile?.last_name || "no data",
      show: !edit,
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
      title: "birth date",
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
  ];

  return (
    <Card className="h-full bg-muted dark:bg-card">
      <FormProvider {...form}>
        <form className="h-full flex flex-col px-4 gap-3 sm:px-6 sm:gap-4">
          {/* Input  */}
          {items.map((item, i) => (
            <Item
              key={i}
              hidden={item.show}
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
                    {item.description || ""}
                  </ItemDescription>
                )}
              </ItemContent>
            </Item>
          ))}

          {/* Submit */}
          <div className="mt-6 sm:mt-8 xl:mt-auto">
            <ProfileDetailSubmit
              onSubmit={onSubmit}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};
