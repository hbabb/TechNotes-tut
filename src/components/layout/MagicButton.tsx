import { Button, type ButtonProps } from "@/components/ui/button";

interface MagicButtonProps extends ButtonProps {
  children: React.ReactNode;
  lightBackgroundGradient?: {
    from: string; // Start color for light mode
    to: string; // End color for light mode
  };
  darkBackgroundGradient?: {
    from: string; // Start color for dark mode
    to: string; // End color for dark mode
  };
  lightRingGradient?: string; // Ring gradient for light mode
  darkRingGradient?: string; // Ring gradient for dark mode
}

export function MagicButton({
  children,
  lightBackgroundGradient = {
    from: "", // Light purple
    to: "", // Deeper purple
  },
  darkBackgroundGradient = {
    from: "", // Dark purple
    to: "", // Deep navy
  },
  lightRingGradient = "",
  darkRingGradient = "",
  ...props
}: MagicButtonProps) {
  const isDarkMode =
    typeof window !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <Button {...props} variant="magic" size="default">
      {/* Ring gradient */}
      <span
        className={"absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"}
        style={{
          background: isDarkMode ? darkRingGradient : lightRingGradient,
        }}
      />
      {/* Background gradient */}
      <span
        className={
          "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-3 py-1 font-medium text-sm backdrop-blur-3xl"
        }
        style={{
          background: `linear-gradient(to bottom, ${
            isDarkMode ? darkBackgroundGradient.from : lightBackgroundGradient.from
          }, ${isDarkMode ? darkBackgroundGradient.to : lightBackgroundGradient.to})`,
        }}
      >
        {children}
      </span>
    </Button>
  );
}
