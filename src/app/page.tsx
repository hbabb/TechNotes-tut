import { MatrixRain } from '@/components/animations/matrix-rain'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
// import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
export default function Home() {
  return (
    <div className="">
      <MatrixRain />

      <main className="mx-auto flex h-dvh max-w-5xl flex-col justify-center text-center">
        <div className="mx-auto flex w-4/5 flex-col gap-6 rounded-xl border border-green-500/20 bg-black/40 bg-gradient-to-br from-green-500/[0.15] to-black/50 p-6 font-code shadow-[0_0_15px_rgba(0,255,0,0.07)] ring-1 ring-green-500/30 backdrop-blur-md sm:max-w-96 sm:text-2xl">
          <h1 className="font-bold text-4xl text-slate-50">
            The Computer
            <br />
            Repair Shop
          </h1>
          <p className="font-code text-slate-300/90">
            555 Gateway Lane <br />
            Kansas City, KS 55555
          </p>
          <p className="text-slate-300/90">Open Daily: 9am - 5pm</p>
          <Link href="tel:5555555555" className="text-slate-200 hover:underline">
            (555) 555-5555
          </Link>
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            variant="outline"
            className="mt-6 w-1/3 rounded-full border-2 border-notfound-white bg-matrix-glow px-6 py-6 text-lg text-notfound-white hover:text-red-600"
          >
            <Link href={'/login'}>Employee Sign In</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
