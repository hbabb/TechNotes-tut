import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type React from "react";

interface ShimmerButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShimmerButton({ children, className, onClick, ...props }: ShimmerButtonProps) {
  return (
    // Button code
    <Button
      {...props}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[length:200%_100%] bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className,
      )}
    >
      {children}
    </Button>
  );
}
