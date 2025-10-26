import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function UpdateActivity() {
    const { id } = useParams();
    const [activity, setActivity] = useState({})
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [contacts, setContacts] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/activityGroup/${id}`)
            .then((res) => res.json())
            .then((data) => setActivity(data))
            .catch((error) => console.error('errore fetch gruppi:', error));
    }, [id])

    // gestione img
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!activity.id) {
            console.error("Nessun evento selezionato per l'aggiornamento!");
            return;
        }

        let uploadedImgUrl = activity.imgUrl; // Se non viene cambiata l’immagine, mantieni quella esistente

        // Se l’utente ha scelto un nuovo file, caricalo
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

        // Prepara i dati da aggiornare
        const updatedActivity = {
            // ✅ PATCH aggiorna solo i campi presenti: quindi inseriamo solo quelli valorizzati
            ...(title && { title }),
            ...(subTitle && { subTitle }),
            ...(des && { des }),
            ...(contacts && { contacts }),
            ...(uploadedImgUrl && { imgUrl: uploadedImgUrl }),
        };

        console.log("Aggiornamento attivita:", updatedActivity);

        try {
            const res = await fetch(`http://localhost:3000/activityGroup/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedActivity),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Errore aggiornamento attività");
            }

            console.log("Attività aggiornata con successo:", data);
            alert("Attività aggiornata con successo!");

            // Reset campi
            setTitle('');
            setSubTitle('');
            setDes('');
            setImgUrl('');
            setContacts('');
            setFile(null);

        } catch (error) {
            console.error("Errore durante l'aggiornamento:", error);
            alert("Errore durante l'aggiornamento dell'attività!");
        }
    };

    return (
        <section id="updateActivity">
            <h1>Aggiungi Gruppo Attività</h1>
            <form onSubmit={handleUpdate} className="d-flex flex-wrap justify-content-around">
                <label className="inpCont" >
                    <h3>
                        Inserisci Titolo
                    </h3>
                    <input
                        type="text"
                        placeholder={activity.title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                </label>
                <label className="inpCont">
                    <h3>
                        Inserisci Sottotitolo
                    </h3>
                    <input
                        type="text"
                        placeholder={activity.subTitle}
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
                        placeholder={activity.contacts}
                        value={contacts}
                        onChange={(e) => setContacts(e.target.value)}

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
                        placeholder={activity.des}
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                </label>
                <button id="updateButton" type="submit">
                    Modifica Gruppo
                </button>
            </form>
        </section>
    )
}