import { ProgressPage } from "@/components/progress-page";
import { Spinner } from "@/components/ui/spinner";

export default function HomePage() {
  return (
    <div className="h-screen grid place-items-center">
      <div className="w-[50%] max-w-xl space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2 capitalize">
          <Spinner className="text-primary size-5" />
          loading...
        </div>
        <ProgressPage />
      </div>
    </div>
  );
}
