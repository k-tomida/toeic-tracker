import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/auth/useAuth";

// PublicOnlyRoute.tsx
export const PublicOnlyRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dash-board" replace />;
    }

    return <Outlet />;
};