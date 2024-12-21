import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="grid h-dvh w-full place-content-center">
        <div className="flex flex-col items-center justify-center">
          <LoaderCircle className="size-48 animate-spin text-foreground/20 text-matrix" />
          <span className="font-bold text-matrix-dark lg:text-5xl dark:text-matrix">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
