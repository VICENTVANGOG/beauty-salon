"use client"; // Esto indica que este archivo debe ejecutarse en el cliente

import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@/ui/organisms/table"; 
import Modal from "@/ui/organisms/clientModal";  // Importamos el Modal
import ClientsService from "@/app/infrastructure/services/clientes-services";  // Importamos el servicio

// Instanciamos el servicio de clientes
const clientService = new ClientsService();  

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ClientsPageProps {
  clients: Client[]; // Lista de clientes que se reciben como prop
}

export default function ClientsPage({ clients }: ClientsPageProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientsList, setClientsList] = useState<Client[]>(clients);  // Estado local para los clientes
  const [isLoading, setIsLoading] = useState(false);  // Estado de carga para deshabilitar botones

  // Función para abrir el modal y pasar el cliente a editar
  const handleEdit = (client: Client) => {
    setSelectedClient(client);  // Asignamos el cliente seleccionado
    setIsModalOpen(true);  // Abrimos el modal
  };

  // Función para eliminar un cliente
 // Función para eliminar un cliente
const handleDelete = async (clientId: number) => {
  setIsLoading(true);  // Activamos el estado de carga
  try {
    // Aseguramos que clientId es una cadena
    await clientService.delete(clientId.toString());  // Convertimos el ID a string
    setClientsList(clientsList.filter((client) => client.id !== clientId));
    alert(`Cliente con ID: ${clientId} ha sido eliminado`);
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
  } finally {
    setIsLoading(false);  // Desactivamos el estado de carga
  }
};


  const handleSave = async (clientData: { firstName: string; lastName: string; email: string; phone: string }) => {
    setIsLoading(true); 
    try {
      if (selectedClient && selectedClient.id) {
        // Si ya tenemos un ID de cliente, realizamos una actualización
        await clientService.update(selectedClient.id, clientData);
        setClientsList(clientsList.map((client) => 
          client.id === selectedClient.id ? { ...client, ...clientData } : client
        ));
        alert("Cliente actualizado correctamente");
      } else {
        // Si no tenemos un ID, creamos un cliente nuevo
        const newClient: Client = await clientService.create(clientData);  // Ahora newClient es del tipo Client
        setClientsList((prevClients) => [...prevClients, newClient]);  // Usamos prevClients para evitar problemas de estado
        alert("Cliente creado correctamente");
      }
      setIsModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al guardar el cliente:", error.message);
      } else {
        console.error("Error desconocido:", error);
      }
    } finally {
      setIsLoading(false);  // Desactivamos el estado de carga
    }
  };
  
  
  
  
  

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="pb-20">
        <div className="px-4 pt-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Lista de Clientes</h1>
          
          <Table>
            <TableHead>
              <tr>
                <TableCell className="font-semibold text-gray-800">ID</TableCell>
                <TableCell className="font-semibold text-gray-800">Nombre</TableCell>
                <TableCell className="font-semibold text-gray-800">Correo</TableCell>
                <TableCell className="font-semibold text-gray-800">Teléfono</TableCell>
                <TableCell className="font-semibold text-gray-800">Acciones</TableCell>
              </tr>
            </TableHead>
            <TableBody>
              {clientsList.length > 0 ? (
                clientsList.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.firstName} {client.lastName}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleEdit(client)} 
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={isLoading} // Deshabilitar durante carga
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(client.id)} 
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        disabled={isLoading} // Deshabilitar durante carga
                      >
                        Eliminar
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No hay clientes disponibles</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Modal para editar o agregar cliente */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSave} 
        client={selectedClient}  // Pasamos el cliente para editar
        isLoading={isLoading} // Pasamos el estado de carga al modal
      />
    </div>
  );
}
