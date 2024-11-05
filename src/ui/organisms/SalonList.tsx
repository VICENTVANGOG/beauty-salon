"use client"
import React, { useEffect, useState } from 'react';
import { SalonCard } from '../molecules/index';
import { SearchBar } from '../molecules/index';

import { HttpClient } from '@/app/infrastructure/utils/index'; 

export interface Specialist {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  validUntil: string;
}

export interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  text: string;
  followers: number;
}

export interface Salon {
  id: React.Key | null | undefined; 
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

const httpClient = new HttpClient();

const SalonList: React.FC = () => {
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const data = await httpClient.get<any[]>('services');
        

        const enrichedData = data.map((service) => ({
          id: service.id,
          name: service.name,
          description: service.description,
          price: service.price,
          image: 'https://example.com/salon.jpg',
          rating: 4.5,
          address: '123 Main St, City',
        }));

        setSalons(enrichedData);
      } catch (error) {
        console.error('Error fetching salons:', error);
      }
    };

    fetchSalons();
  }, []);

  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {salons.map((salon) => (
          <SalonCard
            key={salon.id}
            image={salon.image}
            name={salon.name}
            rating={salon.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default SalonList;
