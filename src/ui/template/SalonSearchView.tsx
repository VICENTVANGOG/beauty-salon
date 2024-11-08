import { Star } from "lucide-react";
import { Card, CardContent } from "@/ui/molecules/card";
import { Button } from "@/ui/atoms/index";
import { ServicesService } from '@/app/infrastructure/services/service.service';
import { BottomNavigation } from '../organisms';

const servicesService = new ServicesService();
export default async function ServicesPage() {
  const data = await servicesService.findAll(1, 10);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="pb-20">
        <div className="px-4 pt-4">
     
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.content.map((service) => (
              <Card
                key={service.id}
                className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white/90 backdrop-blur-lg border-none overflow-hidden group"
              >
                <CardContent className="p-0">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                        ${service.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">4.5</span>
                        <span className="text-sm text-gray-500">(50)</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Disponible</span>
                        <span className="text-sm font-semibold text-green-500">Ahora</span>
                      </div>
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-colors"
                      >
                        Reservar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 mb-8 text-center">
            <Button
              className="bg-black hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3 rounded-xl shadow-sm"
            >
              Cargar más servicios
            </Button>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <BottomNavigation />
      </div>
    </div>
  );
}
