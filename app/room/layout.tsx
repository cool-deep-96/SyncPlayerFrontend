import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} h-screen text-white bg-black`}>
      <div className='text-center text-xl '>Room</div>
      {children}

    </div>

  )
}
