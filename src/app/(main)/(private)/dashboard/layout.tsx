import React from 'react'
import AuthGuard from './guard/AuthGuard'
import Sidebar from '@/ui/organisms/sideBar'

export default function PrivateLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className="flex">
      <Sidebar className="flex-none" activeRoute={''} />
      <div className="flex-1">
        <AuthGuard>{children}</AuthGuard>
      </div>
    </div>
  )
}
