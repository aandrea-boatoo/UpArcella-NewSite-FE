
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Reuleaux } from 'ldrs/react'
import 'ldrs/react/Reuleaux.css'
export default function CredereInsieme() {

    const [files, setFiles] = useState([]);
    const [archiveFiles, setArchiveFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:3000/credereApi`)
            .then((res) => res.json())
            .then((data) => setFiles(data))
            .catch((err) => console.log("errore fetch drive", err));

        fetch(`http://localhost:3000/credereApi/archivio`)
            .then((res) => res.json())
            .then((data) => {
                const sorted = data.sort(
                    (a, b) => new Date(b.modifiedTime) - new Date(a.modifiedTime)
                );

                setArchiveFiles(sorted)
            })
            .catch((error) => console.log("errore fetch archivio:", error))
            .finally(() => setLoading(false))
    }, []);
    console.log(files);
    console.log(archiveFiles)
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
    };
    console.log(files);
    console.log(archiveFiles);
    return (

        <section id="credereInsieme" className="m-6">
            <h2>Credere Insieme</h2>

            {files.length > 0 ? (
                <>
                    <div id="credereContent" className="d-flex justify-content-around">
                        {/* Mostra l’ultimo file */}
                        <iframe
                            src={`https://drive.google.com/file/d/${files[0].id}/preview`}
                            title="Ultima Uscita"
                            allow="autoplay"
                        ></iframe>
                        <div id="archivio">
                            <h3>Archivio rubriche</h3>
                            <ul>
                                {archiveFiles.map((file) => (
                                    <li key={file.id} className="my-4" >
                                        <Link to={`/https://drive.google.com/file/d/${file.id}/view?usp=sharing`}>
                                            {file.name.replace(".pdf", "")}
                                        </Link>
                                        <br />
                                        <small>
                                            Pubblicato il{" "}
                                            {new Date(file.modifiedTime).toLocaleDateString("it-IT")}
                                        </small>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <p>Nessun file trovato nella cartella.</p>
            )}
        </section>
    );
}