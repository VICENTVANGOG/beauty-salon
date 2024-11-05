// types/next-auth.d.ts
import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id?: string;
            token?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}
