import { useState, useEffect } from "react"

export default function AddMain() {
    const [tagsList, setTagsList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [place, setPlace] = useState('');
    const [newTag, setNewTag] = useState('');
    const [eventsList, setEventsList] = useState([]);
    const [showAccordion, setShowAccordion] = useState('d-none')
    const [groupList, setGroupList] = useState([]);
    const [groupId, setGroupId] = useState();
    const [file, setFile] = useState(null);
    // --- CARICA TAGS ESISTENTI ---
    useEffect(() => {
        fetch(`http://localhost:3000/tags`)
            .then((res) => res.json())
            .then((data) => setTagsList(data))
            .catch((err) => console.error("Errore fetch tags:", err));
        fetch(`http://localhost:3000/events`)
            .then((res) => res.json())
            .then((data) => setEventsList(data))
            .catch((err) => console.error("Errore fetch events:", err));
        fetch(`http://localhost:3000/activityGroup`)
            .then((res) => res.json())
            .then((data) => setGroupList(data))
            .catch((error) => console.error('errore fetch gruppi:', error));
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


    // --- GESTISCI SUBMIT DEL FORM ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadedImgUrl = "";

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

        const newEvent = {
            title,
            description,
            eDateTime: date,
            imgUrl: uploadedImgUrl,
            place,
            who_id: groupId,
            tags_id_tags: selectedTags, // ✅ PASSA DIRETTAMENTE QUI I TAG!
        };

        const res = await fetch(`http://localhost:3000/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });

        if (!res.ok) {
            const error = await res.json();
            console.error("Errore creazione evento:", error);
            return;
        }

        const data = await res.json();
        console.log("Evento creato con successo:", data);

        // Reset campi
        setDate('');
        setDescription('');
        setImgUrl('');
        setPlace('');
        setSelectedTags([]);
        setTitle('');
    };




    return (
        <section id="handleMain" className="m-6">
            <h1>Gestione Eventi e Post</h1>

            <div id="addEvent">
                <h2>Aggiungi un evento</h2>
                <form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-around">

                    <label className="inpCont tagLabel">
                        <h3>Inserisci Tag</h3>
                        <p>dopo che hai creato un tag, ricarica la pagina</p>
                        <div>
                            <input
                                type="text"
                                placeholder="Crea nuovo tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                            <button onClick={addTag}>Aggiungi Tag</button>
                        </div>
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
                        {imgUrl &&
                            <div className="imgContainer">
                                <p>anteprima immagine</p>
                                <img src={imgUrl} alt="preview" width={200} />
                            </div>}
                    </label>

                    <label className="inpCont">
                        <h3>
                            Inserisci Data
                        </h3>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
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
                            required
                        />
                    </label>



                    <label className="inpCont long">
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



                    <button type="submit" className="mt-4">
                        Salva Evento
                    </button>
                </form>
            </div>
        </section>
    );
}
