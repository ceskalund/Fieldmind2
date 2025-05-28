import Image from "next/image"

interface TeamCardProps {
  name: string
  role: string
  bio: string
  image: string
  linkedinUrl?: string
}

export function TeamCard({ name, role, bio, image, linkedinUrl }: TeamCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center">
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 128px, 128px"
          quality={85}
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-medium text-center mb-1">
        {linkedinUrl ? (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sage-green transition-colors"
          >
            {name}
          </a>
        ) : (
          name
        )}
      </h3>
      <p className="text-sage-green font-medium text-center mb-4">{role}</p>
      <p className="text-gray-600 text-center">{bio}</p>
    </div>
  )
}
