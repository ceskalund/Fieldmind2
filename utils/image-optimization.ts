/**
 * Utility functions for image optimization
 */

// Calculate optimal image sizes based on viewport
export function getResponsiveImageSizes(options: {
  mobile?: number
  tablet?: number
  desktop?: number
  default?: number
}): string {
  const { mobile = 100, tablet = 50, desktop = 33, default: defaultSize = 100 } = options

  return `(max-width: 640px) ${mobile}vw, (max-width: 1024px) ${tablet}vw, ${desktop}vw, ${defaultSize}vw`
}

// Get image dimensions for optimal loading
export function getImageDimensions(
  containerWidth: number,
  containerHeight: number,
  aspectRatio = 16 / 9,
): { width: number; height: number } {
  // If both dimensions are provided, use them
  if (containerWidth && containerHeight) {
    return { width: containerWidth, height: containerHeight }
  }

  // If only width is provided, calculate height based on aspect ratio
  if (containerWidth) {
    return { width: containerWidth, height: Math.round(containerWidth / aspectRatio) }
  }

  // If only height is provided, calculate width based on aspect ratio
  if (containerHeight) {
    return { width: Math.round(containerHeight * aspectRatio), height: containerHeight }
  }

  // Default dimensions if nothing is provided
  return { width: 1200, height: Math.round(1200 / aspectRatio) }
}

// Get image loading strategy based on importance
export function getImageLoadingStrategy(importance: "high" | "medium" | "low" = "medium"): "eager" | "lazy" {
  return importance === "high" ? "eager" : "lazy"
}

// Get image quality based on importance
export function getImageQuality(importance: "high" | "medium" | "low" = "medium"): number {
  switch (importance) {
    case "high":
      return 85
    case "medium":
      return 75
    case "low":
      return 60
    default:
      return 75
  }
}
