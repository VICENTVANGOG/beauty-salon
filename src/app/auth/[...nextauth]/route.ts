import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
  id?: string;
  token?: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface CustomSession extends Session {
  user: {
    id?: string;
    token?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

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
          return null; 
        }


        const loginRequest: LoginRequest = {
          password: credentials.password,
          userName: credentials.username,
        };

     
        const user = await authenticateUser(loginRequest); 

        if (user) {
          return user; 
        }

        return null; 
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.id = authUser.id;
        token.token = authUser.token;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      customSession.user.id = token.id;
      customSession.user.token = token.token;
      return customSession;
    },
  },
};

export default NextAuth(authOptions);

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
function authenticateUser(loginRequest: LoginRequest) {
    throw new Error("Function not implemented.");
}

.
