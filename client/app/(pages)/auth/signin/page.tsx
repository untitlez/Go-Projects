import { fetchAccounts } from "@/lib/use-server/fetch-account";

import { fetchSession } from "@/lib/use-server/fetch-session";

import { AuthDetail } from "@/components/auth/auth-detail";
import { AuthSigninForm } from "@/components/auth/auth-signin-form";
import { fetchProfileById } from "@/lib/use-server/fetch-profile";

export const dynamic = "force-dynamic";

export default async function SigninPage() {
  const [users, limit, session] = await Promise.all([
    fetchAccounts("50"),
    fetchAccounts("2"),
    fetchSession(),
  ]);

  const profile = session ? await fetchProfileById(session?.id) : null;

  return (
    <div
      className={`w-full h-full grid gap-6 ${session ? "place-items-center" : "xl:grid-cols-2 2xl:grid-cols-3"}`}
    >
      <AuthSigninForm session={session} />
      <AuthDetail
        users={users}
        limit={limit}
        session={session}
        profile={profile}
      />
    </div>
  );
}
