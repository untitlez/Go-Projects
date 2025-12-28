import { AuthProvider } from "@/components/auth-provider";
import { ProfileImage } from "@/components/profile/profile-image";
import { ProfileAccount } from "@/components/profile/profile-account";
import { ProfileDetail } from "@/components/profile/profile-detail";

export default function ProfileIdPage() {
  return (
    <AuthProvider>
      <div className="w-full max-w-screen-lg grid lg:grid-cols-2 gap-8 ">
        <div className="space-y-8">
          <ProfileImage />
          <ProfileAccount />
        </div>
        <ProfileDetail />
      </div>
    </AuthProvider>
  );
}
