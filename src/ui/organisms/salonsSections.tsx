import { SalonCard } from '../molecules/index'

export const SalonsSection = () => {
  const salons = [
    {
      image: 'https://media.istockphoto.com/id/134052142/es/foto/peluquer%C3%ADa-situaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=L_zKMVvvykg7VUFNaovTmKfgtgZd3SKSnOCggtFxOQg=',
      name: 'Luxury Salon & Spa',
      rating: 4.8,
    },
    {
      image: 'https://www.shutterstock.com/image-illustration/luxury-pink-beauty-care-salon-600nw-2319523823.jpg',
      name: 'Modern Style Studio',
      rating: 4.7,
    },
  ]

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Top Rated Salons</h2>
        <button className="text-sm text-[#E75A5A]">See All</button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {salons.map((salon) => (
          <SalonCard key={salon.name} {...salon} />
        ))}
      </div>
    </div>
  )
}