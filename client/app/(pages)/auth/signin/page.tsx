import { fetchAccounts } from "@/lib/use-server/fetch-account";

import { fetchSession } from "@/lib/use-server/fetch-session";

import { AuthDetail } from "@/components/auth/auth-detail";
import { AuthSigninForm } from "@/components/auth/auth-signin-form";

export const dynamic = "force-dynamic";

export default async function SigninPage() {
  const users = await fetchAccounts("50");
  const limit = await fetchAccounts("3");

  const session = await fetchSession();

  return (
    <div className="w-full max-w-screen-lg grid lg:grid-cols-2 gap-8">
      <AuthSigninForm session={session} />
      <AuthDetail users={users} limit={limit} session={session} />
    </div>
  );
}
