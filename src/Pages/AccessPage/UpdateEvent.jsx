import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
export default function UpdateEvent() {
    const { id } = useParams();
    const [tagsList, setTagsList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [place, setPlace] = useState('');
    const [newTag, setNewTag] = useState('');
    const [event, setEvent] = useState({});
    const [showAccordion, setShowAccordion] = useState('d-none')
    const [groupList, setGroupList] = useState([]);
    const [groupId, setGroupId] = useState();
    const [file, setFile] = useState(null);
    const accordionRef = useRef();
    // --- CARICA TAGS ESISTENTI ---
    useEffect(() => {
        fetch(`http://localhost:3000/events/${id}`)
            .then((res) => res.json())
            .then((data) => setEvent(data))
            .catch((err) => console.error("Errore fetch evento da modificare:", err));
        fetch(`http://localhost:3000/tags`)
            .then((res) => res.json())
            .then((data) => setTagsList(data))
            .catch((err) => console.error("Errore fetch tags:", err));

        fetch(`http://localhost:3000/activityGroup`)
            .then((res) => res.json())
            .then((data) => setGroupList(data))
            .catch((error) => console.error('errore fetch gruppi:', error));
        const handleClickOutside = (e) => {
            if (accordionRef.current && !accordionRef.current.contains(e.target)) {
                setShowAccordion('d-none')
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);


    // --- CREA NUOVO TAG ---
    const addTag = async (e) => {
        e.preventDefault();
        if (!newTag.trim()) return;

        try {
            const res = await fetch(`http://localhost:3000/tags`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTag }),
            });
            if (!res.ok) throw new Error("Errore nella creazione del tag");
            const data = await res.json();
            console.log("Tag creato:", data);

            // Aggiorno la lista locale
            setTagsList([...tagsList, data]);
            setNewTag('');
        } catch (error) {
            console.error("Errore:", error);
        }
    };

    // --- GESTISCI SELEZIONE TAG MULTIPLI ---
    const handleTagSelection = (e) => {
        const tagId = e.target.value;
        setSelectedTags(prev => {
            if (e.target.checked) {
                return [...prev, tagId]
            } else {
                return prev.filter(id => id !== tagId)
            }
        })
        console.log(selectedTags)
    };
    const showTag = () => {
        if (showAccordion) {
            setShowAccordion('')
        } else { setShowAccordion('d-none') }
    }

    // gestione img
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!event.id) {
            console.error("Nessun evento selezionato per l'aggiornamento!");
            return;
        }

        let uploadedImgUrl = imgUrl; // Se non viene cambiata l’immagine, mantieni quella esistente

        // Se l’utente ha scelto un nuovo file, caricalo
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            uploadedImgUrl = data.imgUrl;
        }

        // Prepara i dati da aggiornare
        const updatedEvent = {
            // ✅ PATCH aggiorna solo i campi presenti: quindi inseriamo solo quelli valorizzati
            ...(title && { title }),
            ...(description && { description }),
            ...(place && { place }),
            ...(date && { eDateTime: date }),
            ...(uploadedImgUrl && { imgUrl: uploadedImgUrl }),
            ...(groupId && { who_id: groupId }),
            ...(selectedTags.length > 0 && { tags_id_tags: selectedTags }),
        };

        console.log("Aggiornamento evento:", updatedEvent);

        try {
            const res = await fetch(`http://localhost:3000/events/${event.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEvent),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Errore aggiornamento evento");
            }

            console.log("Evento aggiornato con successo:", data);
            alert("Evento aggiornato con successo!");

            // Reset campi
            setTitle('');
            setDescription('');
            setPlace('');
            setDate('');
            setSelectedTags([]);
            setImgUrl('');
            setFile(null);
            setGroupId(null);

        } catch (error) {
            console.error("Errore durante l'aggiornamento:", error);
            alert("Errore durante l'aggiornamento dell'evento!");
        }
    };


    return (
        <section id='updateEvent' className='m-6'>
            <h1>Modifica Evento</h1>
            <p>cambia solo i campi da modificare</p>
            <form onSubmit={handleUpdate} className="d-flex flex-wrap justify-content-around">

                <label className="inpCont tagLabel">
                    <h3>Inserisci Tag</h3>
                    <p>dopo che hai creato un tag, ricarica la pagina</p>
                    <div className="d-flex h-25">
                        <input
                            type="text"
                            placeholder="Crea nuovo tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                        />
                        <button id='addTagButton' onClick={addTag}> + Tag</button>
                    </div>
                    <div ref={accordionRef}>

                        <p>tag selezionati : {selectedTags.toString()}</p>
                        <button type="button" className="accordion" onClick={() => showTag()}>Lista Tag (max3 selezionabili)</button>
                        <div className={`content ${showAccordion}`}>

                            {tagsList.map((t, i) => (
                                <div key={i}>
                                    <input type="checkbox" name={t.title} id={`tag-${t.id_tags}`} value={t.id_tags} onChange={handleTagSelection} checked={selectedTags.includes(String(t.id)) || selectedTags.includes(String(t.id_tags))} />
                                    <label htmlFor={`tag-${t.id_tags}`}>{t.id_tags}  {t.title}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </label>
                <label className="inpCont">
                    <h3>
                        Inserisci Titolo
                    </h3>
                    <input
                        type="text"
                        placeholder="Titolo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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

                <label className="inpCont">
                    <h3>
                        Inserisci Data
                    </h3>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label className="inpCont">
                    <h3>
                        Inserisci Luogo
                    </h3>
                    <input
                        type="text"
                        placeholder="Luogo"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                </label>
                <label className="inpCont">
                    <h3>Inserisci Gruppo</h3>
                    <select name="group" id="group" placeholder='lista gruppi' onChange={(e) => setGroupId(e.target.value)}>
                        <option value={null}>Gruppo non specificato</option>
                        {groupList.map((g) => (
                            <option key={g.id} value={g.id}>{g.title}</option>
                        ))}
                    </select>
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
                <button id="updateButton" type="submit" className=" mt-4">
                    Modifica Evento
                </button>
            </form>
        </section>
    )
}