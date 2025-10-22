import { Navigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";
import { Reuleaux } from 'ldrs/react'
import 'ldrs/react/Reuleaux.css'
export default function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useAuth();
    if (loading) {
        return (
            <div id="loadingContainer">
                <Reuleaux
                    size="80"
                    stroke="5"
                    strokeLength="0.15"
                    bgOpacity="0.1"
                    speed="1.2"
                    color="blue"
                />
            </div>
        )

    }

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return children;
}
