import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Analytics } from '@vercel/analytics/react'

import 'nextra-theme-docs/style.css'
import '../public/css/custom.css'

export const metadata = {
  title: {
    default: '微笑Wiki',
    template: '%s – 微笑Wiki',
  },
  icons: {
    icon: '/img/logo.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Layout
          pageMap={pageMap}
          navbar={
            <Navbar
              logo={<img src="/img/logo.png" width={30} height={30} alt="Logo" />}
              projectLink="https://github.com/try-to-fly/wiki"
            />
          }
          sidebar={{
            defaultMenuCollapseLevel: 1,
          }}
          toc={{
            float: true,
            title: '目录',
          }}
          editLink={null}
          feedback={{ content: null }}
          footer={
            <Footer>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Powered by Vercel
              </a>
            </Footer>
          }
          docsRepositoryBase="https://github.com/try-to-fly/wiki"
        >
          {children}
        </Layout>
        <Analytics />
      </body>
    </html>
  )
}
