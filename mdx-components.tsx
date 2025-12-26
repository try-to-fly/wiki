import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { components as mdxElementsComponents, Badge, Image, Tweet, YouTube, XmindView } from './components/mdx-client-components'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components?: Record<string, React.ComponentType>) {
  return {
    ...docsComponents,
    ...mdxElementsComponents,
    Badge,
    Image,
    Tweet,
    YouTube,
    XmindView,
    ...components,
  }
}
