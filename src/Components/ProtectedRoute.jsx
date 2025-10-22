import { Navigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return children;
}
