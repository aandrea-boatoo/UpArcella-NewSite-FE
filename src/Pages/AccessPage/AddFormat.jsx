import { useState } from "react";
export default function AddFormat() {
    const [title, setTitle] = useState('');
    const [postDay, setPostDay] = useState('');
    const [comment, setComment] = useState('');
    const [titleThought, setTitleThought] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');


    const handleDaylyShare = async (e) => {
        e.preventDefault()
        const newDaylyShare = {
            title,
            postDay,
            comment
        };
        const res = await fetch(`http://localhost:3000/daylyShare`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDaylyShare)
        })
        if (!res.ok) {
            const error = await res.json();
            console.error("Errore creazione Condivisione Quotidiana:", error);
            return;
        }
        const data = res.json();
        console.log("Condivisione Quotidiana creata con successo:", data)
        alert("Condivisione Quotidiana creata con successo!");

        setTitle('')
        setPostDay('')
        setComment('')
    }
    const handleThought = async (e) => {
        e.preventDefault();
        const newThought = {
            title: titleThought,
            subtitle,
            description
        };
        const res = await fetch(`http://localhost:3000/spunti`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newThought)
        })
        if (!res.ok) {
            const error = await res.json();
            console.error("Errore creazione Spunti di Riflessione:", error);
            return;
        }
        const data = res.json();
        console.log("Spunto di riflesione creato con successo:", data)
        alert("Spunto di riflesione creato con successo!");
        setTitleThought('');
        setSubtitle('');
        setDescription('');
    }
    return (
        <>
            <section id="addDaylyShare" className="m-6">
                <h1>Aggiungi  Condivisione Quotidiana</h1>

                <form onSubmit={handleDaylyShare}>
                    <label className="inpCont">
                        <h3>
                            Inserisci Titolo
                        </h3>
                        <input
                            type="text"
                            placeholder="Titolo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label className="inpCont">
                        <h3>
                            Inserisci Data
                        </h3>
                        <input
                            type="date"
                            value={postDay}
                            onChange={(e) => setPostDay(e.target.value)}
                            required
                        />
                    </label>
                    <label className="inpCont long">
                        <h3>
                            Inserisci Descrizione
                        </h3>
                        <textarea
                            placeholder="Descrizione"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                    <button id="subDayly" type="submit">
                        Salva Commento
                    </button>
                </form>
            </section>
            <section id="addThought" className="m-6">
                <h1>Aggiungi Riflessione</h1>

                <form onSubmit={handleThought}>
                    <label className="inpCont">
                        <h3>
                            Inserisci Titolo
                        </h3>
                        <input
                            type="text"
                            placeholder="Titolo"
                            value={titleThought}
                            onChange={(e) => setTitleThought(e.target.value)}
                            required
                        />
                    </label>
                    <label className="inpCont">
                        <h3>
                            Inserisci Titolo
                        </h3>
                        <input
                            type="text"
                            placeholder="Sottotitolo"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            required
                        />
                    </label>
                    <label className="inpCont long">
                        <h3>
                            Inserisci Descrizione
                        </h3>
                        <textarea
                            placeholder="Descrizione"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <button id="subThought" type="submit">
                        Salva Riflessione
                    </button>
                </form>
            </section>
        </>
    )
}