"use client"; // Importante si estás usando Next.js con renderizado en el cliente

import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: { firstName: string; lastName: string; email: string; phone: string }) => void;
  client?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null; // Permitir que client sea null
  isLoading?: boolean; // Añadimos un estado de carga
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, client, isLoading = false }) => {
  // Estados locales para almacenar los datos del formulario
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Si el cliente existe y el modal se abre, pre-llenamos los datos
  useEffect(() => {
    if (client && isOpen) {
      setFirstName(client.firstName);
      setLastName(client.lastName);
      setEmail(client.email);
      setPhone(client.phone);
    } else {
      // Si no hay cliente, limpiamos el formulario
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
    }
  }, [client, isOpen]);

  // Enviar los datos al componente padre
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ firstName, lastName, email, phone });
    // Limpiamos el formulario después de enviarlo
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4" id="modal-title">
          {client ? "Editar Cliente" : "Agregar Cliente"}
        </h2>
        
        <form onSubmit={handleSubmit} aria-labelledby="modal-title">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-describedby="first-name-help"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              disabled={isLoading}  // Deshabilitar cuando está cargando
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md`}
              disabled={isLoading}  // Deshabilitar el botón mientras se está enviando
            >
              {isLoading ? "Cargando..." : client ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
