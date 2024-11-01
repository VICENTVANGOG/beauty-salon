import { Star } from 'lucide-react';

interface SalonCardProps {
  image: string;
  name: string;
  rating: number;
}

export const SalonCard = ({ image, name, rating }: SalonCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <div className="relative h-48">
        <img src={image} alt={name} className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-80" />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white bg-opacity-80 px-3 py-1 shadow-md">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 hover:text-[#E75A5A] transition-colors duration-200">{name}</h3>
      </div>
    </div>
  );
};
