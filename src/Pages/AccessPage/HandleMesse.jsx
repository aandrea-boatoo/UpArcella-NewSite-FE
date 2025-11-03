import { useState, useEffect } from "react";
export default function HandleMesse() {
    const giorni = ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];
    const posti = ["Santa", "Sanbe", "Sanfi"];
    const [orari, setOrari] = useState({
        Lunedi: { Santa: "", Sanbe: "", Sanfi: "" },
        Martedi: { Santa: "", Sanbe: "", Sanfi: "" },
        Mercoledi: { Santa: "", Sanbe: "", Sanfi: "" },
        Giovedi: { Santa: "", Sanbe: "", Sanfi: "" },
        Venerdi: { Santa: "", Sanbe: "", Sanfi: "" },
        Sabato: { Santa: "", Sanbe: "", Sanfi: "" },
        Domenica: { Santa: "", Sanbe: "", Sanfi: "" },
    });
    const handleChange = (giorno, posto, value) => {
        setOrari(prev => ({
            ...prev,
            [giorno]: {
                ...prev[giorno],
                [posto]: value
            }
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await fetch(`http://localhost:3000/messe`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orari),
            })
            const data = await res.json();
            console.log("Risposta Server:", data)
            alert("Orari messe salvati con successo");
        } catch (err) {
            console.error("Errore nel salvataggio orari:", err)
            alert("Errore nel salvataggio");
        }
    }

    console.log(orari)
    return (
        <section id="handleMesse" className="m-6">
            <h1>Orari Messe</h1>
            <table>
                <thead>
                    <tr>
                        <th>Giorno</th>
                        {posti.map(posto => (
                            <th key={posto}>{posto}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {giorni.map(giorno => (
                        <tr key={giorno}>
                            <td>{giorno}</td>
                            {posti.map(posto => (
                                <td key={posto}>
                                    <input
                                        className="mb-2"
                                        type="text"
                                        value={orari[giorno][posto]}
                                        onChange={(e) => handleChange(giorno, posto, e.target.value)}
                                        placeholder="es. 10:00"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button id="subOrari" type="button" onClick={handleSubmit}>
                Salva Orari
            </button>
        </section>
    )
}