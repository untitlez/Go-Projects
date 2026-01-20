import { fetchSession } from "@/lib/use-server/fetch-session";
import { fetchUserById } from "@/lib/use-server/fetch-user";
import { fetchProfileById } from "@/lib/use-server/fetch-profile";

import { UnauthorizedPage } from "@/components/unauthorized-page";
import { ProfileImage } from "@/components/profile/profile-image";
import { ProfileAccount } from "@/components/profile/profile-account";
import { ProfileDetail } from "@/components/profile/profile-detail";
import { ProfileSignout } from "@/components/profile/profile-signout";

interface ProfileIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfileIdPage({ params }: ProfileIdPageProps) {
  const { id } = await params;
  const [session, user] = await Promise.all([
    fetchSession(),
    fetchUserById(id),
  ]);
  const profile = user ? await fetchProfileById(user?.id) : null;

  if (!session) return <UnauthorizedPage />;

  return (
    <div className="w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div className="lg:row-span-2 xl:row-auto">
        <ProfileImage profile={profile} />
      </div>
      <div className="flex flex-col gap-6">
        <ProfileAccount user={user} />
        <ProfileSignout />
      </div>
      <ProfileDetail profile={profile} />
    </div>
  );
}
