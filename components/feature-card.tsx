import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="bg-light-gray p-8 rounded-lg">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="flex justify-center mb-6">
          <Icon className="h-10 w-10 text-sage-green" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-medium text-center mb-4">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </div>
  )
}
