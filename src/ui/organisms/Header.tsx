import { MapPin, User } from 'lucide-react'
import { SearchBar } from '../molecules/index'

export const Header = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#E75A5A]" />
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500">Location</span>
            <span className="font-medium">New York, USA</span>
          </div>
        </button>
        <button className="rounded-full bg-gray-100 p-2">
          <User className="h-5 w-5" />
        </button>
      </div>
      <SearchBar />
    </div>
  )
}