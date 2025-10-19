import { Link } from "react-router-dom"
export default function OwnerPage() {
    // gestione contenuti

    // statistiche

    return (
        <>
            <section id="add" className="m-6">
                <h2>Gestione Dati</h2>
                <div className="buttonContainer d-flex flex-wrap gap-3 justify-content-center">

                    <div className="btn">
                        <Link>
                            <h3 className="h5">Gestisci Eventi/Post</h3>
                        </Link>
                    </div>
                    <div className="btn">
                        <Link>
                            <h3 className="h5">Aggiungi Evento</h3>
                        </Link>
                    </div>
                    <div className="btn">
                        <Link>
                            <h3 className="h5">Aggiungi Post</h3>
                        </Link>
                    </div>
                    <div className="btn">
                        <Link>
                            <h3 className="h5">Aggiungi Attivita'</h3>
                        </Link>
                    </div>
                </div>
            </section>
            <section id="statistics" className="m-6 my-5">
                <h2>Statistiche</h2>
            </section>
        </>
    )
}