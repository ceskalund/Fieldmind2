"use client"

import Image from "next/image"

interface ImageBackgroundProps {
  imageSrc: string
  overlayOpacity?: number
  priority?: boolean
}

export function ImageBackground({
  imageSrc,
  overlayOpacity = 0.5,
  priority = false,
}: ImageBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
        quality={90}
      />
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} aria-hidden="true" />
    </div>
  )
} 