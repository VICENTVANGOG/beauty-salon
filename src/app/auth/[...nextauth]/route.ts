import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define el tipo de LoginRequest para las credenciales
interface LoginRequest {
  userName: string;
  password: string;
}

// Define el tipo de usuario después de la autenticación
interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

// Extiende la sesión de NextAuth para incluir el token de autenticación
interface CustomSession extends Session {
  user: {
    id?: string;
    token?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// Configuración de NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Correo Electrónico", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.password || !credentials.username) {
          console.error("Missing credentials");
          return null; // Si no se proporcionan credenciales, retorna null
        }

        const loginRequest: LoginRequest = {
          userName: credentials.username,
          password: credentials.password,
        };

        // Llama a tu función para autenticar al usuario
        const user = await authenticateUser(loginRequest);

        if (user) {
          return user; // Si el usuario es válido, retorna el objeto de usuario
        }

        return null; // Si no se encuentra el usuario, retorna null
      },
    }),
  ],
  session: {
    strategy: "jwt", // Usa JWT como estrategia de sesión
  },
  callbacks: {
    async session({ session, token }) {
      const customSession = session as CustomSession;
  
      if (typeof token.id === 'string') {
        customSession.user.id = token.id;
      }
      if (typeof token.token === 'string') {
        customSession.user.token = token.token;
      }
  
      return customSession;
    },
  }
  
};

export default NextAuth(authOptions);

// Esta parte de código no es necesaria si usas la API route estándar de Next.js
// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);

// Implementación de la función de autenticación (debe verificar las credenciales)
async function authenticateUser(loginRequest: LoginRequest): Promise<AuthUser | null> {
  // Aquí iría la lógica para autenticar al usuario. Por ejemplo:
  const response = await fetch("https://mi-api.com/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  });

  if (!response.ok) {
    console.error("Autenticación fallida");
    return null;
  }

  // Aquí esperamos que el backend retorne los detalles del usuario y el token
  const data = await response.json();
  if (data && data.id && data.token) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      token: data.token,
    };
  }

  return null; // Si la autenticación falla, retornamos null
}
