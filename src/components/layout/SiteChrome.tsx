'use client'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''
  const hideChrome = pathname.startsWith('/communities')

  return (
    <>
      {!hideChrome && <Nav />}
      {children}
      {!hideChrome && <Footer />}
    </>
  )
}
