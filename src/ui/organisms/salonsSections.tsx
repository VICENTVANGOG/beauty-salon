"use client"

import React, { useState } from 'react';
import { SalonCard } from '../molecules/index';
import { Modal } from '../molecules/index';

interface Salon {
  image: string;
  name: string;
  rating: number;
  address?: string;
  phone?: string;
  website?: string;
  services?: string[];
}

export const SalonsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  const salons: Salon[] = [
    {
      image: 'https://media.istockphoto.com/id/134052142/es/foto/peluquer%C3%ADa-situaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=L_zKMVvvykg7VUFNaovTmKfgtgZd3SKSnOCggtFxOQg=',
      name: 'Luxury Salon & Spa',
      rating: 4.8,
      address: '123 Main St, Anytown USA',
      phone: '555-555-5555',
      website: 'www.luxurysalon.com',
      services: ['Haircuts', 'Coloring', 'Manicures', 'Pedicures']
    },
    {
      image: 'https://www.shutterstock.com/image-illustration/luxury-pink-beauty-care-salon-600nw-2319523823.jpg',
      name: 'Modern Style Studio',
      rating: 4.7,
      address: '456 Elm St, Othertown USA',
      phone: '555-555-5556',
      website: 'www.modernstylestudio.com',
      services: ['Haircuts', 'Blowouts', 'Facials', 'Massage']
    }
  ];

  const handleCardClick = (salon: Salon) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSalon(null);
  };

  return (
    <div className="p-4">
      <Modal isOpen={isModalOpen} onClose={closeModal} salon={selectedSalon}>
        {selectedSalon && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <p className="text-gray-600 mb-2">{selectedSalon.address}</p>
            <p className="text-gray-600 mb-2">{selectedSalon.phone}</p>
            <p className="text-gray-600 mb-2">
              <a href={`http://${selectedSalon.website}`} target="_blank" rel="noopener noreferrer" className="text-[#E75A5A]">
                {selectedSalon.website}
              </a>
            </p>
            <div className="mt-4">
              <h4 className="text-base font-semibold">Services:</h4>
              <ul className="list-disc list-inside">
                {selectedSalon.services?.map((service, index) => (
                  <li key={index} className="text-gray-600">{service}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Top Rated Salons</h2>
        <button className="text-sm text-[#E75A5A]">See All</button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {salons.map((salon) => (
          <div key={salon.name} onClick={() => handleCardClick(salon)}>
            <SalonCard {...salon} />
          </div>
        ))}
      </div>
    </div>
  );
};