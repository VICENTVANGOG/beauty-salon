"use client"
import React, { useEffect, useState } from 'react';
import { SalonCard } from '../molecules/index';
import { SearchBar } from '../molecules/index';

import { ServicesService } from '@/app/infrastructure/services/service.service';  // Importa el servicio que creaste

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

const servicesService = new ServicesService();  // Instancia del servicio

const SalonList: React.FC = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        // Usamos la instancia de ServicesService para obtener los datos de los salones
        const data = await servicesService.findAll(1, 10);  // Página 1, tamaño 10 (ajustar según sea necesario)

        // Enriquecemos los datos para que coincidan con la estructura de Salon
        const enrichedData = data.content.map((service: { id: any; name: any; description: any; price: any; }) => ({
          id: service.id,
          name: service.name,
          description: service.description,
          price: service.price,
          image: 'https://example.com/salon.jpg',  // Imagen por defecto
          rating: 4.5,  // Calificación por defecto, puedes ajustarlo según la lógica de tu API
          address: '123 Main St, City',  // Dirección por defecto
        }));

        setSalons(enrichedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching salons:', error);
        setError('Hubo un problema al cargar los salones');
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
