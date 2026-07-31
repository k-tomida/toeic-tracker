import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

// PublicOnlyRoute.tsx
export const PublicOnlyRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dash-board" replace />;
    }

    return <Outlet />;
};