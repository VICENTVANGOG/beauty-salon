
import { Home,  Store, Users2, MessageSquare,LogOut } from "lucide-react"
import { cn } from "@/ui/lib/utils"
import { NavLink } from "./index"
import { UserProfile } from "./index"

interface SidebarProps {
  className?: string
  activeRoute: string 
}

export default function Sidebar({ className, activeRoute }: SidebarProps) {
  const userName = "Mike"

  const navigation = [
    { icon: <Home className="h-4 w-4" />, label: "appointment", href: "http://localhost:3000/dashboard/admin" },
    { icon: <Store className="h-4 w-4" />, label: "services", href: "/store" },
    { icon: <Users2 className="h-4 w-4" />, label: "employee", href: "/customers" },
    { icon: <MessageSquare className="h-4 w-4" />, label: "client", href: "http://localhost:3000/dashboard/admin-client" },
  ]

  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col justify-between rounded-r-3xl bg-gray-900 p-4",
        className
      )}
    >
      <div className="flex flex-col gap-6">

        <UserProfile name={userName} />

 
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => (
            <NavLink
              key={item.label}
              {...item}
              isActive={activeRoute === item.href} 
            />
          ))}
        </nav>
      </div>


      <NavLink
        icon={<LogOut className="h-4 w-4" />}
        label="Log Out"
        className="text-red-400 hover:text-red-300"
        href="/"
      />
    </aside>
  )
}
