import React from 'react';

interface Salon {
  image: string;
  name: string;
  rating: number;
  address?: string;
  phone?: string;
  website?: string;
  services?: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  salon: Salon | null;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, salon, children }: ModalProps) => {
  if (!isOpen || !salon) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 z-60 relative w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-2xl font-semibold">{salon.name}</h2>
          <p className="text-gray-600 text-base">Rating: {salon.rating}</p>
          {children && (
            <div className="mt-4 border-t pt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};