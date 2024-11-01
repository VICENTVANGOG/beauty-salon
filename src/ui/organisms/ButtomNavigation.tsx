"use client";

import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';

export const BottomNavigation = () => {
  const handleNavigation = (path: string) => {

    window.location.href = path;
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-around border-b bg-white py-3 shadow-md z-10">
      <button className="flex flex-col items-center gap-1" onClick={() => handleNavigation('/')}>
        <Home className="h-6 w-6 text-[#E75A5A]" />
        <span className="text-xs text-[#E75A5A]">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={() => handleNavigation('/explore')}>
        <Search className="h-6 w-6 text-gray-400" />
        <span className="text-xs text-gray-400">Explore</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={() => handleNavigation('/bookings')}>
        <Calendar className="h-6 w-6 text-gray-400" />
        <span className="text-xs text-gray-400">Bookings</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={() => handleNavigation('/chat')}>
        <MessageSquare className="h-6 w-6 text-gray-400" />
        <span className="text-xs text-gray-400">Chat</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={() => handleNavigation('/login')}>
        <User className="h-6 w-6 text-gray-400" />
        <span className="text-xs text-gray-400">Profile</span>
      </button>
    </div>
  );
};
