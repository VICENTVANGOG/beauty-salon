// NavLink.tsx
import React from "react"
import { cn } from "@/ui/lib/utils"

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

export function NavLink({ icon, label, isActive, className, ...props }: NavLinkProps) {
  return (
    <a
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        "hover:bg-gray-800/50",
        isActive ? "bg-gray-800/50 text-white" : "text-gray-300", // Estilo activo
        className
      )}
      {...props}
    >
      {icon}
      {label}
    </a>
  )
}
