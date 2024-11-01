import { Star } from 'lucide-react'

interface SalonCardProps {
  image: string
  name: string
  rating: number
}

export const SalonCard = ({ image, name, rating }: SalonCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="relative h-48">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white px-2 py-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900">{name}</h3>
      </div>
    </div>
  )
}