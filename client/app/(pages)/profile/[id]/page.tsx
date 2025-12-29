import { fetchSession } from "@/lib/use-server/fetch-session";
import { fetchUserById } from "@/lib/use-server/fetch-user";
import { fetchProfileById } from "@/lib/use-server/fetch-profile";

import LoadingPage from "../../loading";

import { UnauthorizedPage } from "@/components/unauthorized-page";
import { ProfileImage } from "@/components/profile/profile-image";
import { ProfileAccount } from "@/components/profile/profile-account";
import { ProfileDetail } from "@/components/profile/profile-detail";

export default async function ProfileIdPage() {
  const session = await fetchSession();

  if (!session) return <UnauthorizedPage />;

  const user = await fetchUserById(session?.id);
  const profile = await fetchProfileById(user?.id);

  if (!user && !profile) return <LoadingPage />;

  return (
    <div className="w-full max-w-screen-lg grid lg:grid-cols-2 gap-8 ">
      <div className="space-y-8">
        <ProfileImage profile={profile} />
        <ProfileAccount user={user} />
      </div>
      <ProfileDetail profile={profile} />
    </div>
  );
}
