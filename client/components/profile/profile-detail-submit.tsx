"use client";

import { useFormContext } from "react-hook-form";

import { profileUpdateType } from "@/validators/profile.validator";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileAccountSubmitProps {
  onSubmit: (value: profileUpdateType) => Promise<void>;
  edit: boolean;
  setEdit: (value: boolean) => void;
}

export const ProfileDetailSubmit = ({
  onSubmit,
  edit,
  setEdit,
}: ProfileAccountSubmitProps) => {
  const form = useFormContext();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      {form.formState.isDirty ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="default" className="btn capitalize">
              save
            </Button>
          </DialogTrigger>
          <Button
            type="button"
            variant="outline"
            className="btn capitalize -mt-2"
            onClick={() => {
              setEdit(!edit);
              form.reset();
            }}
          >
            cancel
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="capitalize">save changes ?</DialogTitle>
              <DialogDescription>
                Review your changes before saving. These updates will modify
                your profile information.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="btn capitalize"
                  disabled={isSubmitting}
                >
                  cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                className="btn capitalize"
                disabled={isSubmitting}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Saving...
                  </span>
                ) : (
                  <span>save changes</span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        // BUTTON CANCEL EDIT
        <Button
          type="button"
          variant="secondary"
          className="btn capitalize"
          onClick={() => setEdit(!edit)}
        >
          cancel
        </Button>
      )}
    </>
  );
};
