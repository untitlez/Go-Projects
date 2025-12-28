"use client";

import { useEffect, useState } from "react";

import { useStoreAuth } from "@/lib/use-client/store/store-auth";
import { useSession } from "@/lib/use-client/hook/use-auth";
import { useAllUser } from "@/lib/use-client/hook/use-user";
import { useAllProfile } from "@/lib/use-client/hook/use-profile";
import { deleteUser } from "@/lib/use-client/axios-user";
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

const limit = "10";

export const ProfileTable = () => {
  const [open, setOpen] = useState(false);

  const { authorization } = useStoreAuth();
  const { session, getSession } = useSession();
  const { allUser, getAllUser } = useAllUser(limit);
  const { allProfile, getAllProfile } = useAllProfile(limit);

  const onDelete = async (id: string) => {
    await deleteUser(id);
    getAllUser();
    getAllProfile();
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

  useEffect(() => {
    getSession();
    getAllUser();
    getAllProfile();
  }, [authorization]);

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
          {allProfile ? (
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
