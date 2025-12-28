import { Spinner } from "@/components/ui/spinner";

export default function LoadingPage() {
  return (
    <div className="h-[50vh] grid place-content-center">
      <div className="flex items-center gap-2 capitalize">
        <Spinner className="text-primary size-5" />
        loading...
      </div>
    </div>
  );
}
