"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '../atoms/index';

const specials = [
  {
    title: 'Get Special Discount',
    description: 'Up to 40',
    label: 'Limited time',
  },
  {
    title: 'Exclusive Offer!',
    description: 'Up to 50',
    label: 'Limited time',
  },

];

export const SpecialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % specials.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">#SpecialForYou</h2>
        <button className="text-sm text-[#E75A5A]">See All</button>
      </div>
      <div className="mt-4 rounded-xl bg-gray-900 p-4 text-white">
        <div className="mb-2 inline-block rounded-full bg-white/20 px-2 py-0.5 text-sm">
          {specials[currentIndex].label}
        </div>
        <h3 className="text-xl font-semibold">{specials[currentIndex].title}</h3>
        <p className="mb-4 text-3xl font-bold">
          {specials[currentIndex].description}
          <span className="text-[#E75A5A]">%</span>
        </p>
        <Button variant="primary" size="sm">
          Claim
        </Button>
      </div>
    </div>
  );
};
