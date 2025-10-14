
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function CredereInsieme() {
    const apiKey = process.env.CREDERE_API_KEY;
    const folderId = process.env.CREDERE_FOLDER_ID;
    const archiveFolderId = process.env.CREDERE_ARCHIVIO_ID;

    const [files, setFiles] = useState([]);
    const [archiveFiles, setArchiveFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchArchiveFiles = async () => {
            try {
                const res = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q='${archiveFolderId}'+in+parents+and+mimeType='application/pdf'&fields=files(id,name,modifiedTime)&key=${apiKey}`
                );
                const data = await res.json();

                if (data.files) {
                    const sorted = data.files.sort(
                        (a, b) => new Date(b.modifiedTime) - new Date(a.modifiedTime)
                    );
                    setArchiveFiles(sorted);
                }
            } catch (error) {
                console.error("Errore nel fetch dei file archiviati:", error);
            }
        }
        const fetchDriveFiles = async () => {
            try {
                const res = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&fields=files(id,name,modifiedTime)&key=${apiKey}`
                );
                const data = await res.json();

                if (data.files) {
                    setFiles(data.files);
                }
            } catch (error) {
                console.error("Errore nel fetch del file Drive:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDriveFiles();
        fetchArchiveFiles();
    }, []);

    if (loading) {
        return (
            <p>Caricamento Rubrica...</p>
        )
    };
    console.log(files);
    console.log(archiveFiles);
    return (
        <section id="credereInsieme" className="m-6">
            <h2>Credere Insieme</h2>

            {files.length > 0 ? (
                <>
                    <div id="credereContent" className="d-flex justify-content-between">
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
                                    <li key={file.id} >
                                        <Link to={`/https://drive.google.com/file/d/${file.id}/view?usp=sharing`}>
                                            {file.name.replace(".pdf", "")}
                                        </Link>
                                        <br />
                                        <small>
                                            Ultima modifica:{" "}
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