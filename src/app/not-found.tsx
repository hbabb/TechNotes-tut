import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black">
      <main className="flex flex-row items-center justify-evenly">
        <div className="mr-96 text-left text-notfound-white">
          <h1 className="font-bold text-[200px] text-inter">Oops !</h1>
          <h3 className="font-bold text-[44px] text-inter">something went wrong...</h3>
          <p className="mb-52 font-normal text-[23px] text-inter text-notfound-gray">
            try to reload this page or go back to the homepage
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-2 border-notfound-white bg-transparent px-8 py-6 text-lg text-notfound-white hover:text-red-600"
          >
            <Link href="/">
              <MoveLeft />
              homepage
            </Link>
          </Button>
        </div>
        <div>
          <Image
            src="/images/SpaceMan.svg"
            alt="Astronaut on Moon"
            width={477}
            height={477}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            title="Page Not Found"
          />
        </div>
      </main>
    </div>
  )
}
