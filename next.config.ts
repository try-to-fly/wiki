import nextra from 'nextra'
import { createRequire } from 'module'
import path from 'path'

const require = createRequire(import.meta.url)

const withNextra = nextra({
  defaultShowCopyCode: true,
})

export default withNextra({
  transpilePackages: ['react-tweet'],
  webpack: (config) => {
    // Fix: Module not found: Can't resolve '@theguild/remark-mermaid/mermaid'
    config.resolve.alias['@theguild/remark-mermaid/mermaid'] = path.join(
      path.dirname(require.resolve('@theguild/remark-mermaid/package.json')),
      'dist',
      'mermaid.js'
    )
    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs/intro',
        permanent: false,
      },
      {
        source: '/docs',
        destination: '/docs/intro',
        permanent: false,
      },
    ]
  },
})
