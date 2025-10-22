import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../data/AuthContext";
export default function Authenticator() {

    const [utente, setUtente] = useState("");
    const [psw, setPsw] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ utente, psw }),
            });
            const data = await res.json();

            if (data.success) {
                setLoggedIn(true);
                localStorage.setItem("auth", "true");
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Errore di connessione al server");
        }
    };

    if (loggedIn) {
        login();
        navigate('/owner');
    }
    return (
        <form id="authForm" onSubmit={handleLogin} className="m-6 mx-auto d-flex row gap-2">
            <input
                className="py-2 px-3"
                name="user"
                type="text"
                placeholder="Utente"
                value={utente}
                onChange={(e) => setUtente(e.target.value)}
            />
            <input
                className="py-2 px-3"
                name="password"
                type="password"
                placeholder="Password"
                value={psw}
                onChange={(e) => setPsw(e.target.value)}
            />
            <button type="submit">Accedi</button>
            {error && <p>{error}</p>}
        </form>
    );
}
