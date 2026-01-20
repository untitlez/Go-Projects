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
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  edit: boolean;
  setEdit: (value: boolean) => void;
}

export const ProfileDetailSubmit = ({
  onSubmit,
  openDialog,
  setOpenDialog,
  edit,
  setEdit,
}: ProfileAccountSubmitProps) => {
  const form = useFormContext();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <div className="grid gap-3">
        <DialogTrigger asChild hidden={!form.formState.isDirty}>
          <Button type="button" variant="default" className="btn capitalize">
            save
          </Button>
        </DialogTrigger>
        <Button
          type="button"
          variant="secondary"
          className="bg-background border btn capitalize"
          onClick={() => {
            setEdit(!edit);
            form.reset();
          }}
        >
          {edit ? "cancel" : "edit profile"}
        </Button>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">save changes ?</DialogTitle>
          <DialogDescription>
            Review your changes before saving. These updates will modify your
            profile information.
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
            <span className="flex items-center gap-2">
              <Spinner className={isSubmitting ? "block" : "hidden"} />
              {isSubmitting ? "Saving..." : "save changes"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
