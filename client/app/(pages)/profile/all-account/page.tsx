import { fetchSession } from "@/lib/use-server/fetch-session";
import { fetchAllProfile } from "@/lib/use-server/fetch-profile";
import { profileQueryType } from "@/validators/profile.validator";

import { UnauthorizedPage } from "@/components/unauthorized-page";
import { ProfileSearch } from "@/components/profile/profile-search";
import { ProfileTable } from "@/components/profile/profile-table";

export const dynamic = "force-dynamic";

const initLimit = "10";

interface ProfileAllAccountPageProps {
  searchParams: Promise<profileQueryType>;
}

export default async function ProfileAllAccountPage({
  searchParams,
}: ProfileAllAccountPageProps) {
  const params = await searchParams;
  const queryParams = new URLSearchParams(params);

  queryParams.set("limit", initLimit);
  const queryString = queryParams.toString();

  const [session, allProfile] = await Promise.all([
    fetchSession(),
    fetchAllProfile(queryString),
  ]);

  if (!session) return <UnauthorizedPage />;

  const pagination = {
    limit: params.limit || "10",
    offset: params.offset || "0",
  };

  return (
    <div className="w-full space-y-6">
      <ProfileSearch initLimit={initLimit} count={allProfile?.length} />
      <ProfileTable
        session={session}
        allProfile={allProfile}
        pagination={pagination}
      />
    </div>
  );
}
