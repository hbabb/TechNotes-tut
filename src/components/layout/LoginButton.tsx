'use client'

import { Button } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import { LogIn } from 'lucide-react'

export function LoginButton() {
  return (
    <Button
      asChild
      className="hover:-translate-y-0.5 relative transform border border-matrix/40 bg-gradient-to-b from-matrix/90 to-matrix/70 font-geistMono text-matrix-dark uppercase tracking-wider shadow-lg shadow-matrix-glow/50 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-t before:from-matrix-glow before:to-transparent before:opacity-50 after:absolute after:inset-0 after:bg-matrix/20 after:shadow-[inset_0_1px_8px_rgba(0,255,0,0.4)] hover:shadow-matrix-glow/70 hover:after:bg-matrix/30 hover:before:opacity-75"
    >
      <LoginLink>
        <div className="inline-flex items-center justify-between gap-12">
          Sign In <LogIn />
        </div>
      </LoginLink>
    </Button>
  )
}
