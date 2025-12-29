"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteUser } from "@/lib/use-client/axios-user";
import { sessionType } from "@/validators/session.validator";
import { userType } from "@/validators/user.validator";
import { profileType } from "@/validators/profile.validator";
import LoadingPage from "@/app/(pages)/loading";

import { ProfileTableBody } from "./profile-table-body";
import { ProfileTableNoBody } from "./profile-table-nobody";
import { ProfileTablePagination } from "./profile-table-pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tableHeadField = [
  { label: "no." },
  { label: "username" },
  { label: "full name" },
  { label: "gender" },
  { label: "birth date" },
  { label: "email" },
  { label: "address" },
  { label: "citizen id" },
  { label: "phone" },
  { label: "created" },
  { label: "" },
];

interface ProfileTableProps {
  session?: sessionType;
  allUser?: userType[];
  allProfile?: profileType[];
  limit?: string;
}

export const ProfileTable = ({
  session,
  allUser,
  allProfile,
  limit,
}: ProfileTableProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onDelete = async (id: string) => {
    await deleteUser(id);
    router.refresh();
  };

  const findUserId = (userId: string) => {
    return allProfile?.find((profile) => profile.user_id === userId);
  };

  const allData = allUser?.map((user) => ({
    user,
    profile: findUserId(user.id),
  }));

  const colSpan = tableHeadField.length;

  const length = allData?.length || 0;
  const pagination = Math.ceil(length / Number(limit));

  if (!allData) return <LoadingPage />;

  return (
    <div className="overflow-hidden rounded-md border p-4">
      <Table>
        <TableCaption>
          <ProfileTablePagination pagination={pagination} />
        </TableCaption>
        <TableHeader className="bg-muted">
          <TableRow className="capitalize">
            {tableHeadField.map((item, i) => (
              <TableHead key={i}>{item.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allData ? (
            <ProfileTableBody
              allData={allData}
              session={session}
              onDelete={onDelete}
              open={open}
              setOpen={setOpen}
            />
          ) : (
            <ProfileTableNoBody colSpan={colSpan} />
          )}
        </TableBody>
      </Table>
    </div>
  );
};
