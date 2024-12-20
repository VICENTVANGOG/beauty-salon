import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ajusta la importación según sea necesario

const defaultBaseUrl = "https://beautysalongates-production.up.railway.app/api/v1";

export default class HttpClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaultBaseUrl;
  }

  // Obtener los headers dependiendo de si estamos en el servidor o el cliente
  private async getHeader() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Si estamos en el servidor, obtenemos la sesión con getServerSession
    if (typeof window === "undefined") {
      // Solo se ejecuta en el servidor
      const session = await getServerSession(authOptions);

      // Verificamos si el token está presente en la sesión
      if (session && session.user.token) {
        headers["Authorization"] = `Bearer ${session.user.token}`;
        console.log("Token desde el servidor:", session.user.token); // Añadir log para verificar el token
      } else {
        console.error("No se encontró token en la sesión del servidor");
      }
    } else {
      // Si estamos en el cliente, buscamos el token en localStorage o cookies
      const token = localStorage.getItem("authToken"); // O usa cookies si es necesario
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        console.log("Token desde el cliente:", token); // Añadir log para verificar el token
      } else {
        console.error("No se encontró token en localStorage");
      }
    }

    return headers;
  }

  // Manejar las respuestas
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Si la respuesta no es exitosa, tratamos de obtener más detalles del error
      const errorData = await response.json().catch(() => {
        return { message: "Error desconocido" }; // Si el JSON no puede ser parseado, devolvemos un mensaje genérico
      });

      if (response.status === 403) {
        // Manejo específico para el error 403 (Forbidden)
        console.error("Error 403: Permisos insuficientes o token inválido.");
        throw new Error(`403 Forbidden: ${errorData.message || "Permisos insuficientes"}`);
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
      throw new Error("Error al parsear la respuesta JSON");
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
}
