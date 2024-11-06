import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Obtener la sesión del servidor
    const session = await getServerSession(authOptions);

    if (session) {
        // Si hay sesión, devolver el token
        res.status(200).json({ token: session.user.token });
    } else {
        // Si no hay sesión, devolver un error
        res.status(401).json({ error: "No autenticado" });
    }
}
