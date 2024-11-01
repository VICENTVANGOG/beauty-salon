import { Search } from 'lucide-react'
import { Input } from '../atoms/index'

export const SearchBar = () => {
  return (
    <div className="relative w-full">
      <Input
        placeholder="Search Salon, Specialist..."
        className="pl-10 w-full"
      />
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    </div>
  )
}