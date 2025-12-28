"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, X } from "lucide-react";

import {
  RemoveUploadImage,
  updateProfile,
  uploadImage,
} from "@/lib/use-client/axios-profile";
import { useProfileById } from "@/lib/use-client/hook/use-profile";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

export const ProfileImage = () => {
  const { id } = useParams<{ id: string }>();
  const { profile, getProfileById } = useProfileById(id);

  const [files, setFiles] = useState<FileList | null>();
  const [image, setImage] = useState(profile?.image);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const fileData = setFileData();
    const res = await uploadImage(fileData);

    setLoading(false);
    setImage(res.data.url);
  };

  // STEP 3 : Update Data
  const onSubmit = async () => {
    setIsSubmitting(true);

    const fileData = setFileData();
    await RemoveUploadImage(fileData);

    const id = String(profile?.id);
    const body = { image: image };
    await updateProfile(id, body);
    getProfileById();

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
    getProfileById();
  }, [profile]);

  return (
    <Card className="w-full overflow-hidden bg-transparent">
      <CardContent className="grid gap-4 p-6 md:p-8">
        <Item variant="outline">
          <div className="relative overflow-hidden w-full aspect-square">
            {loading ? (
              <div className="h-full rounded-sm bg-muted grid place-content-center">
                <div className="flex items-center gap-2 capitalize">
                  <Loader className="size-5 animate-spin" />
                  loading...
                </div>
              </div>
            ) : (
              <Image
                src={image || "/shiba.jpg"}
                alt="image"
                sizes="100vw"
                className="rounded-sm object-cover"
                fill={true}
                unoptimized={true}
              />
            )}
          </div>
          <ItemContent>
            <ItemTitle className="capitalize">profile image</ItemTitle>
          </ItemContent>
          <ItemActions>
            {edit ? (
              <div className="flex items-center gap-2">
                {/* Input  */}
                <Input
                  type="file"
                  className="max-w-60 capitalize cursor-pointer active:cursor-progress opacity-80 hover:opacity-100"
                  disabled={isSubmitting}
                  onChange={(e) => setFiles(e.target.files)}
                />

                {/* Submit */}
                {files == null ? (
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="btn capitalize"
                    onClick={() => setEdit(!edit)}
                  >
                    <X />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="btn capitalize"
                    disabled={isSubmitting}
                    onClick={onSubmit}
                  >
                    {isSubmitting ? <Spinner /> : "save"}
                  </Button>
                )}
              </div>
            ) : (
              <Button
                type="button"
                variant="secondary"
                className="btn capitalize"
                onClick={() => setEdit(!edit)}
              >
                change image
              </Button>
            )}
          </ItemActions>
        </Item>
      </CardContent>
    </Card>
  );
};
