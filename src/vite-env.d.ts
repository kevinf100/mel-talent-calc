/// <reference types="vite/client" />

// CSS imports
declare module "*.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Base image imports without query parameters
declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

// Vite imagetools workaround - using &imagetools suffix
// This allows TypeScript to match imports with query parameters
// Usage: import img from './image.webp?w=200&h=100&imagetools'
declare module "*&imagetools" {
  /**
   * Vite imagetools processed image
   * - Docs: https://github.com/JonasKruckenberg/imagetools
   * - The &imagetools suffix is ignored by vite-imagetools but helps TypeScript
   */
  const src: string;
  export default src;
}

// Enhanced ImportMeta interface for Vite glob
interface ImportMeta {
  readonly glob: (pattern: string, options?: { query?: string; eager?: boolean }) => Record<string, () => Promise<unknown>>;
}
