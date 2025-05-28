import { lazyLoad } from "@/utils/lazy-loading"

// Lazy load components that aren't needed for initial render
export const LazyNewsletterPopup = lazyLoad(
  () => import("./newsletter-popup").then((mod) => ({ default: mod.NewsletterPopup })),
  {
    ssr: false,
    loading: () => null,
  },
)

export const LazyCookieConsent = lazyLoad(
  () => import("./cookie-consent").then((mod) => ({ default: mod.CookieConsent })),
  {
    ssr: false,
    loading: () => null,
  },
)

export const LazyImageBackground = lazyLoad(
  () => import("./image-background").then((mod) => ({ default: mod.ImageBackground })),
  {
    ssr: true,
  },
)

export const LazyNewsletterForm = lazyLoad(
  () => import("./newsletter-form").then((mod) => ({ default: mod.NewsletterForm })),
  {
    ssr: false,
  },
)
