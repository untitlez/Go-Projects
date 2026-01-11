import { ProgressPage } from "@/components/progress-page";
import { Spinner } from "@/components/ui/spinner";

export default function HomePage() {
  return (
    <div className="h-screen grid place-items-center">
      <div className="w-[50%] max-w-xl space-y-6">
        <div className="flex flex-col items-center text-center gap-4 ">
          <Spinner className="text-primary size-8" />

          <div className="space-y-1">
            <p className="font-medium capitalize">Waking up the server…</p>
            <p className="text-xs text-muted-foreground">
              This usually takes a few seconds.
            </p>
          </div>
        </div>
        <ProgressPage />
      </div>
    </div>
  );
}
