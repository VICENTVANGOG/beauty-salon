import { BottomNavigation, SalonsSection, SpecialsSection, ServicesSection, Header } from '../organisms/index';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="mx-auto max-w-4xl px-4">
        <Header />
        <div className="space-y-4">
          <SpecialsSection />
          <ServicesSection />
          <SalonsSection />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};
