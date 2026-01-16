"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { deleteUser } from "@/lib/use-client/axios-user";
import { sessionType } from "@/validators/session.validator";
import { profileType } from "@/validators/profile.validator";

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
  { label: "full name" },
  { label: "gender" },
  { label: "email" },
  { label: "address" },
  { label: "phone" },
  { label: "created" },
  { label: "" },
];

interface ProfileTableProps {
  session?: sessionType;
  allProfile?: profileType[];
  pagination: {
    limit: string;
    offset: string;
  };
}

export const ProfileTable = ({
  session,
  allProfile,
  pagination,
}: ProfileTableProps) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(Number(pagination?.offset));

  const router = useRouter();
  const params = new URLSearchParams();
  const colSpan = tableHeadField.length;
  const total = allProfile?.length || 0;

  const offsetNumber = Number(pagination?.offset);
  const limitNumber = Number(pagination?.limit);

  const prev = offsetNumber * limitNumber + 1;
  const next = prev + limitNumber - 1;
  const last = total < limitNumber;
  const index = offsetNumber * limitNumber;

  const onDelete = async (id: string) => {
    await deleteUser(id);
    router.refresh();
  };

  useEffect(() => {
    params.set("offset", String(page));
    params.set("limit", String(limitNumber));
    router.replace("?" + params.toString());
  }, [page]);

  return (
    <div className="overflow-hidden rounded-md border p-4 bg-card dark:bg-transparent">
      <Table>
        <TableCaption>
          <ProfileTablePagination
            prev={prev}
            next={next}
            last={last}
            page={page}
            setPage={setPage}
          />
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
              allProfile={allProfile}
              session={session}
              index={index}
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
