'use client';  // Agregar esta línea para habilitar el renderizado en el cliente

import React, { useState } from 'react';
import { Heart, ChevronLeft, Globe, MessageCircle, Phone, MapPin, Share2 } from 'lucide-react';

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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  salon: Salon | null;
}

export const Modal = ({ isOpen, onClose, salon }: ModalProps) => {
  const [activeTab, setActiveTab] = useState('About Us');
  const [isLiked, setIsLiked] = useState(false);

  if (!isOpen || !salon) return null;

  const tabs = ['Packages', 'Specialists', 'Gallery', 'Reviews', 'About Us'];

  const renderAboutUs = () => (
    <div className="px-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">About Us</h3>
        <p className="text-gray-600 text-sm">{salon.about || "No information available"}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Working Hours</h3>
        <div className="space-y-3">
          {Object.entries(salon.workingHours || {}).map(([day, hours]) => (
            <div key={day} className="flex justify-between text-gray-600">
              <span>{day}</span>
              <span>{hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPackages = () => (
    <div className="px-4 space-y-6">
      {salon.packages?.map((pkg) => (
        <div key={pkg.id} className="mb-4">
          <h3 className="text-lg font-semibold">{pkg.name}</h3>
          <p className="text-sm text-gray-600">{pkg.description}</p>
          <p className="text-sm text-gray-600">Price: ${pkg.price}</p>
          <p className="text-sm text-gray-600">Valid Until: {pkg.validUntil}</p>
        </div>
      ))}
    </div>
  );

  const renderSpecialists = () => (
    <div className="px-4 space-y-6">
      {salon.specialists?.map((specialist) => (
        <div key={specialist.id} className="flex items-center space-x-4 mb-4">
          <img src={specialist.image} alt={specialist.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-semibold">{specialist.name}</h3>
            <p className="text-sm text-gray-600">{specialist.role}</p>
            <p className="text-sm text-gray-600">Rating: {specialist.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="px-4 space-y-6">
      {salon.reviews?.map((review) => (
        <div key={review.id} className="flex items-center space-x-4 mb-4">
          <img src={review.userImage} alt={review.userName} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-semibold">{review.userName}</h3>
            <p className="text-sm text-gray-600">{review.text}</p>
            <p className="text-sm text-gray-600">Rating: {review.rating}</p>
            <p className="text-sm text-gray-600">Followers: {review.followers}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGallery = () => (
    <div className="px-4 grid grid-cols-2 gap-4">
      {salon.gallery?.map((image, index) => (
        <div key={index} className="relative">
          <img src={image} alt={`Gallery Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About Us':
        return renderAboutUs();
      case 'Packages':
        return renderPackages();
      case 'Specialists':
        return renderSpecialists();
      case 'Reviews':
        return renderReviews();
      case 'Gallery':
        return renderGallery();
      default:
        return <div className="p-4">Content for {activeTab}</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">

        <div className="relative h-48">
          <img
            src={salon.image}
            alt={salon.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
              </button>
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
              ★ {salon.rating} ({salon.reviews?.length}k+ Reviews)
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold">{salon.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{salon.services?.join(", ")}</p>
            <p className="text-gray-600 text-sm mt-1 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {salon.address}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {salon.duration} • {salon.distance} • {salon.hours}
            </p>
          </div>

          <div className="flex justify-around py-4 px-2 border-b">
            {[
              { icon: Globe, label: 'Website', action: () => window.open(salon.website, '_blank') },
              { icon: MessageCircle, label: 'Message', action: () => alert('Message button clicked') },
              { icon: Phone, label: 'Call', action: () => window.location.href = `tel:${salon.phone}` },
              { icon: MapPin, label: 'Direction', action: () => window.open(`https://www.google.com/maps?q=${salon.address}`, '_blank') },
              { icon: Share2, label: 'Share', action: () => alert('Share button clicked') }
            ].map(({ icon: Icon, label, action }, index) => (
              <button key={index} onClick={action} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-1">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>
                <span className="text-xs text-gray-600">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>

        <div className="p-4 border-t bg-white">
          <button className="w-full bg-red-500 text-white py-3 rounded-xl font-medium">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
