import { Button } from '@/components/ui/button'
import { FastForward, Rewind } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Customers',
}

export default function Customers() {
  return (
    <main className="flex h-96 flex-col items-center justify-center gap-6 border-2 border-matrix bg-black bg-center bg-cover bg-home-img p-4 text-4xl">
      <div className="mx-auto flex w-4/5 flex-col gap-6 rounded-xl border border-green-500/20 bg-black/40 bg-gradient-to-br from-green-500/[0.15] to-black/50 p-6 font-code shadow-[0_0_15px_rgba(0,255,0,0.07)] ring-1 ring-green-500/30 backdrop-blur-md sm:max-w-96 sm:text-2xl">
        <Button
          asChild
          className="hover:-translate-y-0.5 relative transform border border-matrix/40 bg-gradient-to-b from-matrix/90 to-matrix/70 font-geistMono text-matrix-dark uppercase tracking-wider shadow-lg shadow-matrix-glow/50 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-t before:from-matrix-glow before:to-transparent before:opacity-50 after:absolute after:inset-0 after:bg-matrix/20 after:shadow-[inset_0_1px_8px_rgba(0,255,0,0.4)] hover:shadow-matrix-glow/70 hover:after:bg-matrix/30 hover:before:opacity-75"
        >
          <Link href="/customers/form">
            <div className="inline-flex items-center justify-between gap-12">
              Customer Form Page <FastForward />
            </div>
          </Link>
        </Button>
        <Button
          asChild
          className="hover:-translate-y-0.5 relative transform border border-matrix/40 bg-gradient-to-b from-matrix/90 to-matrix/70 font-geistMono text-matrix-dark uppercase tracking-wider shadow-lg shadow-matrix-glow/50 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-t before:from-matrix-glow before:to-transparent before:opacity-50 after:absolute after:inset-0 after:bg-matrix/20 after:shadow-[inset_0_1px_8px_rgba(0,255,0,0.4)] hover:shadow-matrix-glow/70 hover:after:bg-matrix/30 hover:before:opacity-75"
        >
          <Link href="/">
            <div className="inline-flex items-center justify-between gap-12">
              <Rewind /> Return Home
            </div>
          </Link>
        </Button>
      </div>
    </main>
  )
}
