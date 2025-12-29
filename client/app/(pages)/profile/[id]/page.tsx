import { fetchSession } from "@/lib/use-server/fetch-session";
import { fetchProfileById } from "@/lib/use-server/fetch-profile";

import LoadingPage from "../../loading";

import { UnauthorizedPage } from "@/components/unauthorized-page";
// import { ProfileImage } from "@/components/profile/profile-image";
// import { ProfileAccount } from "@/components/profile/profile-account";
// import { ProfileDetail } from "@/components/profile/profile-detail";

export default async function ProfileIdPage() {
  const session = await fetchSession();
  if (!session) return <UnauthorizedPage />;

  const profile = await fetchProfileById(session?.id);
  if (!profile) return <LoadingPage />;

  console.log("session", session);
  console.log("profile", profile);

  return (
    <div className="w-full max-w-screen-lg grid lg:grid-cols-2 gap-8 ">
      {/* <div className="space-y-8">
        <ProfileImage />
        <ProfileAccount />
      </div>
      <ProfileDetail /> */}
      <p>{profile.id}</p>
      <p>{profile.full_name}</p>
      <p>{profile.username}</p>
    </div>
  );
}
