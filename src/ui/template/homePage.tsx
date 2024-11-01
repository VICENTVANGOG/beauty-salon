import { BottomNavigation, SalonsSection, SpecialsSection, ServicesSection, Header } from '../organisms/index';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white pb-16">
   
      <div className="max-w-7xl mx-auto pt-16 px-4">
        <div className=" rounded-lg p-6 space-y-4"> 
          <Header />
          <SpecialsSection />
          <ServicesSection />
          <SalonsSection />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};
