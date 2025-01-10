import { LoginButton } from "@/components/layout/LoginButton";
import { Button } from "@/components/ui/button";
import { Rewind } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-6 border-2 border-matrix bg-black bg-home-img bg-cover bg-center p-4 text-4xl">
      <div className="mx-auto flex w-4/5 flex-col gap-6 rounded-xl border border-green-500/20 bg-black/40 bg-gradient-to-br from-green-500/[0.15] to-black/50 p-6 font-code shadow-[0_0_15px_rgba(0,255,0,0.07)] ring-1 ring-green-500/30 backdrop-blur-md sm:max-w-96 sm:text-2xl">
        <h1 className="text-center text-white">
          Computer Repair Shop
          <br />
          Employee Login
        </h1>
        <LoginButton />
        <Button
          asChild
          className="relative transform border border-matrix/40 bg-gradient-to-b from-matrix/90 to-matrix/70 font-geistMono uppercase tracking-wider text-matrix-dark shadow-lg shadow-matrix-glow/50 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-t before:from-matrix-glow before:to-transparent before:opacity-50 after:absolute after:inset-0 after:bg-matrix/20 after:shadow-[inset_0_1px_8px_rgba(0,255,0,0.4)] hover:-translate-y-0.5 hover:shadow-matrix-glow/70 hover:before:opacity-75 hover:after:bg-matrix/30"
        >
          <Link href="/">
            <div className="inline-flex items-center justify-between gap-12">
              <Rewind /> Return Home
            </div>
          </Link>
        </Button>
      </div>
    </main>
  );
}
