"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-[20%] right-[20%] z-50">
      <Alert variant="default">
        <Cookie />
        <AlertTitle>We Value Your Privacy</AlertTitle>
        <AlertDescription className="flex items-center">
          These cookies are required for core website functionality such as
          authentication and security. They cannot be disabled.
          <div className="ml-auto">
            <Button
              size="sm"
              className="cursor-pointer capitalize"
              onClick={acceptCookies}
            >
              accept
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
