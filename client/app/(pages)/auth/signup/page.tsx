import { Lock } from "lucide-react";

import { AuthSignupForm } from "@/components/auth/auth-signup-form";

export default function SignupPage() {
  return (
    <div className="w-full max-w-screen-lg grid lg:grid-cols-2 rounded-2xl bg-primary/10 border">
      <AuthSignupForm />
      <div className="hidden lg:grid place-items-center">
        <Lock />
      </div>
    </div>
  );
}
