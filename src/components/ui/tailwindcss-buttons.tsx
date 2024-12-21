"use client";
import { cn } from "@/lib/utils";
import { IconClipboard } from "@tabler/icons-react";
import type React from "react";

export const ButtonsCard = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={onClick}
      className={cn(
        "group/btn relative flex h-60 w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 dark:border-white/[0.2] dark:bg-black",
        className,
      )}
    >
      <div className="absolute inset-0 bg-dot-black/[0.1] dark:bg-dot-white/[0.1]" />
      <IconClipboard className="absolute top-2 right-2 hidden h-4 w-4 text-neutral-300 transition duration-200 group-hover/btn:block" />
      <div className="relative z-40">{children}</div>
    </div>
  );
};
