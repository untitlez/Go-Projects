"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Routes } from "@/lib/routes";
import {
  fetchGatewayService,
  fetchProfileService,
  fetchUserService,
} from "@/lib/use-server/fetch-server";
import { fetchImages } from "@/lib/use-server/fetch-images";

import { Progress } from "@/components/ui/progress";

const values = {
  init: 10,
  step_1: 40,
  step_2: 70,
  step_3: 100,
};

export const ProgressPage = () => {
  const [progress, setProgress] = useState(values.init);
  const router = useRouter();

  const runProgress = async () => {
    if (progress < values.step_1) {
      await fetchProfileService();
      return setProgress(values.step_1);
    }

    if (progress < values.step_2) {
      await fetchUserService();
      return setProgress(values.step_2);
    }

    if (progress < values.step_3) {
      await fetchGatewayService();
      return setProgress(values.step_3);
    }

    if (progress === 100) return router.push(Routes.auth.signup);
  };

  useEffect(() => {
    runProgress();
  }, [progress]);

  return <Progress value={progress} />;
};
