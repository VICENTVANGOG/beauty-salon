import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react'

export const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-white py-3">
      <button className="flex flex-col items-center gap-1">
        <Home className="h-6 w-6 text-[#E75A5A]" />
        <span className="text-xs text-[#E75A5A]">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <Search className="h-6 w-6 text-gray-400" />
        <span className="text-xs text-gray-400">Explore</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <Calendar className="h-6 w-6 text-gray-400" />
        <span className="text-xs text-gray-400">Bookings</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <MessageSquare className="h-6 w-6 text-gray-400" />
        <span className="text-xs text-gray-400">Chat</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <User className="h-6 w-6 text-gray-400" />
        <span className="text-xs text-gray-400">Profile</span>
      </button>
    </div>
  )
}