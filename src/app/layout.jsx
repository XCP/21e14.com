import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import Fathom from '@/components/Fathom';

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - 21e14',
    default:
      '21e14 - Open-source data and tools for Counterparty (XCP)',
  },
  description:
    '21e14 is a suite of websites and tools built to support the Counterparty community on Bitcoin. Whether it be a blockchain explorer, NFT project, or dex trading tool, I build things I think help showcase the onchain activity and value of Counterparty.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Fathom />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
