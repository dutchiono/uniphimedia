import type { Metadata } from 'next'
import './globals.css'
import SiteChrome from '@/components/layout/SiteChrome'

export const metadata: Metadata = {
  title: 'Uni-Phi Media | Midwest News & Community Building',
  description: 'Unbiased, unscripted Midwest news. Intentional communities, permaculture farmsteads, membership programs, and media that matters.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
