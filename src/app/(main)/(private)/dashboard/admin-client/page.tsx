import { Table, TableHead, TableBody, TableRow, TableCell } from "@/ui/organisms/table";
import ClientsService from "@/app/infrastructure/services/clientes-services"; 
import React from "react";
import ClientsPage from '@/ui/template/clients';  // Importa el componente ClientsPage

const clientService = new ClientsService();

async function getClientData() {
  const data = await clientService.findAll(1, 10);  // Hacemos la llamada a la API para obtener los datos de los clientes
  return data.content;  // Devolvemos solo el contenido de los clientes
}

export default async function Page() {
  const clients = await getClientData();  // Obtenemos los datos de los clientes

  return (
    <div>
      <ClientsPage clients={clients} />  {/* Pasamos los datos a ClientsPage como prop */}
    </div>
  );
}
