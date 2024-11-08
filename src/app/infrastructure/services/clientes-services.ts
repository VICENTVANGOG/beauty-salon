import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Client } from "@/types/client";

// Define el valor por defecto de la URL base
const defaultBaseUrl = "https://beautysalongates-production.up.railway.app/api/v1";

// Definimos la interfaz IClients para la respuesta esperada
export interface IClients {
  content: Client[];  // Aquí content es un arreglo de clientes
  totalCount: number;
  page: number;
  size: number;
}

export default class HttpClient {
  create(clientData: { firstName: string; lastName: string; email: string; phone: string; }): Client | PromiseLike<Client> {
    throw new Error("Method not implemented.");
  }
  update(id: number, clientData: { firstName: string; lastName: string; email: string; phone: string; }) {
    throw new Error("Method not implemented.");
  }
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaultBaseUrl;
  }

  // Obtener los headers dependiendo de si estamos en el servidor o el cliente
  private async getHeader() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (typeof window === "undefined") {
      // Si estamos en el servidor, obtenemos la sesión con getServerSession
      const session = await getServerSession(authOptions);
      if (session && session.user.token) {
        headers["Authorization"] = `Bearer ${session.user.token}`;
        console.log('Token desde el servidor:', session.user.token); // Log para verificar el token
      } else {
        console.error('No se encontró token en la sesión del servidor');
      }
    } else {
      // Si estamos en el cliente, buscamos el token en localStorage
      const token = localStorage.getItem("authToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        console.log('Token desde el cliente:', token); // Log para verificar el token
      } else {
        console.error('No se encontró token en localStorage');
      }
    }

    return headers;
  }

  // Manejar las respuestas
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Si la respuesta no es exitosa, tratamos de obtener más detalles del error
      const errorData = await response.json().catch(() => {
        return { message: 'Error desconocido' }; // Si el JSON no puede ser parseado, devolvemos un mensaje genérico
      });

      if (response.status === 403) {
        // Manejo específico para el error 403 (Forbidden)
        console.error('Error 403: Permisos insuficientes o token inválido.');
        console.error('Respuesta del servidor:', errorData);
        throw new Error(`403 Forbidden: ${errorData.message || 'Permisos insuficientes'}`);
      }

      // Para otros errores, mostramos el mensaje o un mensaje genérico
      console.error(`Error ${response.status}:`, errorData);
      throw new Error(errorData.message || `Error desconocido: ${response.status}`);
    }

    // Si la respuesta es vacía (204 No Content), simplemente retornamos un objeto vacío
    if (response.status === 204) {
      return {} as T; // No hay cuerpo, pero esperamos un objeto vacío
    }

    // Si la respuesta tiene un cuerpo, intentamos parsear el JSON
    const text = await response.text();
    if (!text) {
      return {} as T; // Si no hay contenido, devolvemos un objeto vacío
    }

    try {
      return JSON.parse(text) as T;
    } catch (error) {
      throw new Error('Error al parsear la respuesta JSON');
    }
  }

  // Método GET
  async get<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "GET",
      cache: "no-store",
    });
    return this.handleResponse(response);
  }

  // Método DELETE
  async delete<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "DELETE",
    });

    // Manejamos la respuesta para no intentar parsear respuestas vacías
    return this.handleResponse<T>(response);
  }

  // Método POST
  async post<T, B>(url: string, body: B): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  // Método PUT
  async put<T, B>(url: string, body: B): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "PUT",
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  // Método findAll para obtener clientes con paginación
  async findAll(page: number, size: number): Promise<IClients> {
    const url = `clients?page=${page}&size=${size}`;
    const response = await this.get<IClients>(url);
    return response; // Esto debe devolver la propiedad 'content'
  }
}
