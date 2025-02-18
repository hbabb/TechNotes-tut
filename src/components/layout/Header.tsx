import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { File, HomeIcon, LogOut, UsersRound } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "@/components/layout/ModeToggle";
import { NavButton } from "@/components/layout/NavButton";
import { NavButtonMenu } from "@/components/layout/NavButtonMenu";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-20 h-12 animate-slide border-b-2 border-primary p-2">
      <div className="flex h-8 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <NavButton icon={HomeIcon} label="Open Tickets" href="/tickets" />

          <Link
            href="/tickets"
            className="ml-0 flex items-center justify-center gap-2"
            title="Home"
          >
            <h1 className="m-0 mt-1 hidden text-xl font-bold sm:block">Computer Repair Shop</h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton icon={File} label="Tickets" href="/tickets" />

          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
          />

          <ModeToggle />

          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full hover:bg-matrix-dark hover:text-matrix-glow dark:hover:bg-matrix-glow dark:hover:text-matrix-dark"
            aria-label="LogOut"
            title="LogOut"
            asChild
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
