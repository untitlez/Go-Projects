"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authSigninWithGoogle } from "@/lib/use-client/axios-auth";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components//ui/spinner";
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";

export const AuthGoogleProvider = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignin = async () => {
    setLoading(true);
    const res = await authSigninWithGoogle();
    if (!res) return setLoading(false);
    router.push(res);
  };

  return (
    <Item className="bg-background">
      <ItemHeader className="capitalize font-medium text-sm text-muted-foreground dark:text-primary">
        or continue with
      </ItemHeader>

      <ItemContent>
        <Button
          variant="outline"
          className="btn"
          disabled={loading}
          onClick={onSignin}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Please Wait...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Sign in with Google
            </span>
          )}
        </Button>
      </ItemContent>
    </Item>
  );
};
