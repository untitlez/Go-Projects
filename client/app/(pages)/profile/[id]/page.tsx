import { fetchSession } from "@/lib/use-server/fetch-session";
import { fetchUserById } from "@/lib/use-server/fetch-user";
import { fetchProfile } from "@/lib/use-server/fetch-profile";

import { UnauthorizedPage } from "@/components/unauthorized-page";
import { ProfileImage } from "@/components/profile/profile-image";
import { ProfileAccount } from "@/components/profile/profile-account";
import { ProfileDetail } from "@/components/profile/profile-detail";
import { ProfileSignout } from "@/components/profile/profile-signout";

export const dynamic = "force-dynamic";

interface ProfileIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfileIdPage({ params }: ProfileIdPageProps) {
  const { id } = await params;
  const [session, user] = await Promise.all([
    fetchSession(),
    fetchUserById(id),
  ]);
  const profile = user ? await fetchProfile(user?.id) : null;
  const data = { session, user, profile };

  if (!session) return <UnauthorizedPage />;

  return (
    <div className="w-full h-full grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4">
      <div className="lg:row-span-2 xl:row-auto">
        <ProfileImage data={data} />
      </div>
      <div>
        <ProfileDetail data={data} />
      </div>
      <div className="flex flex-col gap-6 lg:gap-4">
        <ProfileAccount data={data} />
        <ProfileSignout data={data} />
      </div>
    </div>
  );
}
