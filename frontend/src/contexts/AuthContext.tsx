// contexts/AuthContext.ts
import { createContext } from "react";

export type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    getToken: () => string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);