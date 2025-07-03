declare module '*.svg' {
  import * as React from 'react'
  // default export is your SVG-as-React-Component
  const Component: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  export default Component
}