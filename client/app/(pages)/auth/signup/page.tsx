import Image from "next/image";

import { fetchImages } from "@/lib/use-server/fetch-images";

import { AuthSignupForm } from "@/components/auth/auth-signup-form";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const query = "cloud";
  const image = await fetchImages(query);

  return (
    <div className="w-full h-full overflow-hidden grid xl:grid-cols-2 gap-8">
      <div className="hidden xl:grid relative w-full h-full rounded-3xl bg-muted">
        {image && (
          <Image
            src={image}
            alt="Image"
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover brightness-90 dark:brightness-75 rounded-3xl"
          />
        )}
      </div>
      <AuthSignupForm />
    </div>
  );
}
