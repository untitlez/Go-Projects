import { AuthProvider } from "@/components/auth-provider";
import { ProfileTable } from "@/components/profile/profile-table";

export default function ProfileAllAccountPage() {
  return (
    <AuthProvider>
      <div className="w-full">
        <ProfileTable />
      </div>
    </AuthProvider>
  );
}
