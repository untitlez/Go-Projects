import Image from "next/image";

import { fetchImages } from "@/lib/use-server/fetch-images";

import { AuthSignupForm } from "@/components/auth/auth-signup-form";

export default async function SignupPage() {
  const query = "sky";
  const image = await fetchImages(query);

  return (
    <div className="relative w-full h-full overflow-hidden max-w-screen-lg grid lg:grid-cols-2 rounded-2xl bg-muted border">
      <AuthSignupForm />
      <Image
        src={image}
        alt="Image"
        fill
        sizes="100vw"
        loading="eager"
        className="hidden lg:grid object-cover brightness-75"
      />
    </div>
  );
}
