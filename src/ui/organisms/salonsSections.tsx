"use client"

import React, { useState } from 'react';
import { SalonCard } from '../molecules/index';
import { Modal } from '../molecules/index';

interface Specialist {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  validUntil: string;
}

interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  text: string;
  followers: number;
}

interface Salon {
  image: string;
  name: string;
  rating: number;
  address?: string;
  phone?: string;
  website?: string;
  services?: string[];
  specialists?: Specialist[];
  packages?: Package[];
  gallery?: string[];
  reviews?: Review[];
  about?: string;
  workingHours?: Record<string, string>;
  distance?: string;
  duration?: string;
  hours?: string;
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
      services: ['Haircuts', 'Coloring', 'Manicures', 'Pedicures'],
      specialists: [
        { id: '1', name: 'John Doe', role: 'Senior Stylist', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW2sjromQtTTzK8dbAcZ9ZIWH7wj8R9G6g9g&s', rating: 4.9 },
        { id: '2', name: 'Jane Smith', role: 'Color Specialist', image: 'https://media.istockphoto.com/id/853924196/es/foto/peluquer%C3%ADa-mujer-en-pie-en-el-sal%C3%B3n-de.jpg?s=612x612&w=0&k=20&c=fno8_zpLJQaHqOLoVDI0NGu0l9Y-l5-5ka0uOEnWzT0=', rating: 4.8 }
      ],
      packages: [
        { id: '1', name: 'Deluxe Package', description: 'Haircut, Color, and Manicure', price: 150, image: 'https://example.com/deluxe-package.jpg', validUntil: '2023-12-31' },
        { id: '2', name: 'Spa Day', description: 'Massage, Facial, and Pedicure', price: 200, image: 'https://example.com/spa-day.jpg', validUntil: '2023-12-31' }
      ],
      gallery: [
        'https://1000cursosgratis.com/wp-content/uploads/2018/02/Curso-de-peluqueria-online.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL19h_wwdk7uAGErSw4SS0uoPWz9lOyGQIEF7V-GNHDBcBSth99gTMp5uYvkymhrKGpn8&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWoeYYPE9nnUrakzHbAo95t8mr2qBgM8e4Ipgsz8gfXTeZmIptC6KaH3fQ9eknlPOHK7s&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSrmDaODsQ9ZQu2WXpBGsAsCRNXAe5ROh5Q&s'
      ],
      reviews: [
        { id: '1', userName: 'Alice', userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_ScL87CubNM5O43RYlTkLQXMmp4w72QmmQ&s', rating: 5, date: '2023-05-01', text: 'Great experience!', followers: 10 },
        { id: '2', userName: 'Bob', userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW2sjromQtTTzK8dbAcZ9ZIWH7wj8R9G6g9g&s', rating: 4, date: '2023-04-15', text: 'Very professional service.', followers: 5 }
      ],
      about: 'Luxury Salon & Spa offers top-notch beauty services in a relaxing environment.',
      workingHours: {
        'Monday': '9:00 AM - 8:00 PM',
        'Tuesday': '9:00 AM - 8:00 PM',
        'Wednesday': '9:00 AM - 8:00 PM',
        'Thursday': '9:00 AM - 8:00 PM',
        'Friday': '9:00 AM - 8:00 PM',
        'Saturday': '10:00 AM - 6:00 PM',
        'Sunday': 'Closed'
      },
      distance: '1.5km',
      duration: '15 min',
      hours: 'Mon-Sun | 9am - 8pm'
    },
    {
      image: 'https://www.shutterstock.com/image-illustration/luxury-pink-beauty-care-salon-600nw-2319523823.jpg',
      name: 'Modern Style Studio',
      rating: 4.7,
      address: '456 Elm St, Othertown USA',
      phone: '555-555-5556',
      website: 'www.modernstylestudio.com',
      services: ['Haircuts', 'Blowouts', 'Facials', 'Massage'],
      specialists: [
        { id: '3', name: 'Alice Johnson', role: 'Massage Therapist', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfTlWlDAICog_PGHfk-kOt1hDSDk7_QI2oxk0iuy2OnHbReTLkYaZI38tr3iyp23b2D3c&usqp=CAU', rating: 4.7 },
        { id: '4', name: 'Bob Williams', role: 'Hair Stylist', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW2sjromQtTTzK8dbAcZ9ZIWH7wj8R9G6g9g&s', rating: 4.8 }
      ],
      packages: [
        { id: '3', name: 'Style Package', description: 'Haircut and Blowout', price: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToSHzMmlfGvuuNDUncFK2YqIqD-i0LVl-9ew&s', validUntil: '2023-12-31' },
        { id: '4', name: 'Relaxation Package', description: 'Massage and Facial', price: 120, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfYRXuVHw4iGpqe29t4pXSsLIJe9F5hEYs-b1whY57XqMpZp2LA8jYpBTVQN1ZBvqYINg&usqp=CAU', validUntil: '2023-12-31' }
      ],
      gallery: [
        'https://example.com/salon2-1.jpg',
        'https://example.com/salon2-2.jpg',
        'https://example.com/salon2-3.jpg',
        'https://example.com/salon2-4.jpg'
      ],
      reviews: [
        { id: '3', userName: 'Charlie', userImage: 'https://latinamericanpost.com/wp-content/uploads/2024/09/20240916_Charly-Garcia-Argentinas-Legendary-Rock-Star-Returns-with-a-Masterpiece-780x470.jpg', rating: 5, date: '2023-05-10', text: 'Loved my new haircut!', followers: 15 },
        { id: '4', userName: 'Diana', userImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Diana%2C_Princess_of_Wales_1997_%282%29.jpg', rating: 4, date: '2023-05-05', text: 'Great massage, will come back.', followers: 8 }
      ],
      about: 'Modern Style Studio brings the latest trends in hair and beauty to our clients.',
      workingHours: {
        'Monday': '10:00 AM - 7:00 PM',
        'Tuesday': '10:00 AM - 7:00 PM',
        'Wednesday': '10:00 AM - 7:00 PM',
        'Thursday': '10:00 AM - 7:00 PM',
        'Friday': '10:00 AM - 7:00 PM',
        'Saturday': '9:00 AM - 5:00 PM',
        'Sunday': 'Closed'
      },
      distance: '2.3km',
      duration: '20 min',
      hours: 'Mon-Sat | 10am - 7pm'
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
      <Modal isOpen={isModalOpen} onClose={closeModal} salon={selectedSalon} />
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