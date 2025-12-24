import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Next.js with TypeScript and SASS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
