"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, X } from "lucide-react";

import { updateProfile, uploadImage } from "@/lib/use-client/axios-profile";
import { profileType } from "@/validators/profile.validator";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { sessionType } from "@/validators/session.validator";

interface ProfileImageProps {
  data: {
    session?: sessionType;
    profile?: profileType;
  };
}

export const ProfileImage = ({ data }: ProfileImageProps) => {
  const { session, profile } = data;

  const [files, setFiles] = useState<FileList | null>();
  const [image, setImage] = useState(profile?.image);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // STEP 1 : Choose Image
  const setFileData = () => {
    if (!files) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    return formData;
  };

  // STEP 2 : Upload Image (Auto)
  const onUpload = async () => {
    setLoading(true);

    if (!files) return;
    const preview = URL.createObjectURL(files[0]);
    setImage(preview);

    setLoading(false);
  };

  // STEP 3 : Update Data
  const onSubmit = async () => {
    if (!profile?.id) return;

    setIsSubmitting(true);
    const fileData = setFileData();
    const res = await uploadImage(fileData);
    const imageURL = res.data;

    const body = { image: imageURL };
    await updateProfile(profile?.id, body);
    router.refresh();

    setIsSubmitting(false);
    setEdit(false);
    setFiles(null);
  };

  useEffect(() => {
    if (!files) return;
    onUpload();
  }, [files]);

  useEffect(() => {
    setImage(profile?.image);
    if (profile) return setLoading(false);
  }, [profile]);

  useEffect(() => {
    if (profile?.image) return;
    setImage(session?.image);
    if (session) return setLoading(false);
  }, [session]);

  return (
    <Card className="relative overflow-hidden h-full aspect-square lg:aspect-auto">
      {image && (
        <Image
          src={image}
          alt="image"
          sizes="100vw"
          className="object-cover brightness-75 dark:brightness-50"
          fill
        />
      )}

      <CardContent className="absolute inset-0 grid place-items-center p-0 rounded-xl dark:text-primary backdrop-blur-xl">
        <Item
          variant="outline"
          className="w-3/4 bg-muted/50 rounded-xl shadow-none"
        >
          <ItemHeader className="relative overflow-hidden aspect-square rounded-sm bg-muted">
            {image ? (
              <Image
                src={image || session?.image || "/shiba.jpg"}
                alt="image"
                sizes="100vw"
                loading="eager"
                className="object-cover rounded-md brightness-90 dark:brightness-75"
                fill
              />
            ) : (
              <div className="flex flex-1 justify-center items-center gap-2 capitalize">
                <Loader className="size- animate-spin" />
                loading...
              </div>
            )}
          </ItemHeader>
          <ItemContent className="hidden sm:block capitalize">
            <ItemTitle>profile image</ItemTitle>
          </ItemContent>
          <ItemActions>
            {/* Input  */}
            <Input
              type="file"
              className="bg-muted cursor-pointer click capitalize opacity-80 hover:opacity-100"
              hidden={!edit}
              disabled={isSubmitting}
              onChange={(e) => setFiles(e.target.files)}
            />

            {/* Button */}
            {files ? (
              <Button
                type="button"
                className="btn capitalize"
                disabled={isSubmitting}
                onClick={onSubmit}
              >
                {isSubmitting ? <Spinner /> : "save"}
              </Button>
            ) : (
              <Button
                size="sm"
                type="button"
                variant={edit ? "destructive" : "secondary"}
                className="btn capitalize"
                onClick={() => setEdit(!edit)}
              >
                {edit ? <X /> : "change image"}
              </Button>
            )}
          </ItemActions>
        </Item>
      </CardContent>
    </Card>
  );
};
