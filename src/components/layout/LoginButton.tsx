"use client";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogIn } from "lucide-react";

export function LoginButton() {
  return (
    <Button asChild>
      <LoginLink>
        <div className="inline-flex items-center justify-between gap-12">
          Sign In <LogIn />
        </div>
      </LoginLink>
    </Button>
  );
}
