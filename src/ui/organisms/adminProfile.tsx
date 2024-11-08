
import { User } from "lucide-react"

interface UserProfileProps {
  name: string
  greeting?: string
}

export function UserProfile({ name, greeting = "Hi, Good Evening" }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-6">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-white">
          <User className="h-8 w-8" />
        </div>
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 bg-emerald-500" />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400">{greeting}</p>
        <h2 className="font-medium text-white">{name}</h2>
      </div>
    </div>
  )
}
