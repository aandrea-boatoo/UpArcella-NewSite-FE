import { useState } from "react"

export default function AddActivity() {
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [contacts, setContacts] = useState('');
    const [file, setFile] = useState(null);
    const [subTitle, setSubTitle] = useState('')

    //gestione imgUrl
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    // submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadedImgUrl = "";

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("http://localhost:3000/upload/group", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            uploadedImgUrl = data.imgUrl;
        }

        const newActivity = {
            title,
            des,
            subTitle,
            imgUrl: uploadedImgUrl,
            contacts
        };

        const res = await fetch(`http://localhost:3000/activityGroup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newActivity),
        });

        if (!res.ok) {
            const error = await res.json();
            console.error("Errore creazione Attivita:", error);
            return;
        }

        const data = await res.json();
        console.log("Attivita creata con successo:", data);
        alert("Attivita creata con successo!");

        // Reset campi
        setTitle('');
        setDes('');
        setFile(null);
        setSubTitle('');
        setContacts();
    };


    return (
        <section id="addActivity" className="m-6">
            <h1>Aggiungi Gruppo Attività</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-around">
                <label className="inpCont" >
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
                        Inserisci Sottotitolo
                    </h3>
                    <input
                        type="text"
                        placeholder="sotto Titolo"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    />
                </label>
                <label className="inpCont">
                    <h3>
                        Inserisci Contatto
                    </h3>
                    <input
                        type="text"
                        placeholder="Contatto"
                        value={contacts}
                        onChange={(e) => setContacts(e.target.value)}
                        required
                    />
                </label>
                <label className="inpCont">
                    <h3>
                        Inserisci Immagine copertina
                    </h3>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                </label>
                <label className="inpCont long">
                    <h3>
                        Inserisci descrizione
                    </h3>
                    <textarea
                        placeholder="Descrizione"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                </label>
                <button id="subButton" type="submit">
                    Salva Gruppo
                </button>
            </form>
        </section>
    )
}