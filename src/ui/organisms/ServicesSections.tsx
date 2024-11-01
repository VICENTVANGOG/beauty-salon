import { Brush, Heart, Scissors } from 'lucide-react';
import { ServiceCard } from '../molecules/index';

export const ServicesSection = () => {
  const services = [
    { icon: <Scissors className="h-6 w-6 text-[#E75A5A]" />, label: 'Haircuts' },
    { icon: <Brush className="h-6 w-6 text-[#E75A5A]" />, label: 'Make Up' },
    { icon: <Scissors className="h-6 w-6 text-[#E75A5A]" />, label: 'Shaving' }, 
    { icon: <Heart className="h-6 w-6 text-[#E75A5A]" />, label: 'Massage' },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Services</h2>
        <button className="text-sm text-[#E75A5A]">See All</button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.label} {...service} />
        ))}
      </div>
    </div>
  );
};
