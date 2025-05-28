import dynamic from "next/dynamic"
import type { ComponentType, LazyExoticComponent } from "react"

interface DynamicOptions {
  loading?: ComponentType
  ssr?: boolean
}

/**
 * Utility function to dynamically import components with consistent loading behavior
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: DynamicOptions = {},
): LazyExoticComponent<T> {
  return dynamic(importFunc, {
    loading: () => (
      <div className="min-h-[100px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sage-green/20 border-t-sage-green rounded-full animate-spin"></div>
      </div>
    ),
    ssr: true,
    ...options,
  })
}
