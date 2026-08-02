// contexts/AuthProvider.tsx
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const getToken = () => token;

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};