import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { File, HomeIcon, LogOut, UsersRound } from 'lucide-react'
import Link from 'next/link'

import { ModeToggle } from '@/components/layout/ModeToggle'
import { NavButton } from '@/components/layout/NavButton'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-20 h-12 animate-slide border-b p-2">
      <div className="flex h-8 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <NavButton icon={HomeIcon} label="Home" href="/home" />

          <Link href="/home" className="ml-0 flex items-center justify-center gap-2" title="Home">
            <h1 className="m-0 mt-1 hidden font-bold text-xl sm:block">Computer Repair Shop</h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton icon={File} label="Tickets" href="/tickets" />

          <NavButton icon={UsersRound} label="Customers" href="/customers" />

          <ModeToggle />

          <Button
            variant={'ghost'}
            size={'icon'}
            className="rounded-full"
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
  )
}
