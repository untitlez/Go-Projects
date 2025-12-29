import { fetchSession } from "@/lib/use-server/fetch-session";
import { fetchAllUser } from "@/lib/use-server/fetch-user";
import { fetchAllProfile } from "@/lib/use-server/fetch-profile";

import LoadingPage from "../../loading";

import { UnauthorizedPage } from "@/components/unauthorized-page";
import { ProfileTable } from "@/components/profile/profile-table";

export default async function ProfileAllAccountPage() {
  const session = await fetchSession();

  if (!session) return <UnauthorizedPage />;

  const limit = "10";
  const allUser = await fetchAllUser(limit);
  const allProfile = await fetchAllProfile(limit);

  if (!allUser && !allProfile) return <LoadingPage />;

  return (
    <div className="w-full">
      <ProfileTable
        session={session}
        allUser={allUser}
        allProfile={allProfile}
        limit={limit}
      />
    </div>
  );
}
