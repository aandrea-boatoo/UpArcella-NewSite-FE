import { Link } from "react-router-dom"
import StatsDashboard from "../../Components/StatsDashBoard"
import { useAuth } from '../../data/AuthContext';
export default function OwnerPage() {
    // gestione contenuti

    // statistiche
    const { logout } = useAuth();

    return (
        <>
            <section id="add" className="m-6 position-relative">
                <h2>Gestione Dati</h2>
                <button type="button" className="logOutButton" onClick={() => logout()}>Log Out</button>
                <div className=" d-flex flex-wrap gap-3 justify-content-center">

                    <div className="btns">
                        <Link to={'handle'}>
                            <h3 className="h5">Gestisci Eventi/Post</h3>
                        </Link>
                    </div>
                    <div className="btns">
                        <Link to={'addMain'}>
                            <h3 className="h5">Aggiungi Evento o Post</h3>
                        </Link>
                    </div>
                    <div className="btns">
                        <Link to={'addFormat'}>
                            <h3 className="h5">Aggiungi Spunti o Commenti</h3>
                        </Link>
                    </div>
                    <div className="btns">
                        <Link to={'addActivity'}>
                            <h3 className="h5">Aggiungi Attivita'</h3>
                        </Link>
                    </div>
                </div>
            </section>
            <section id="statistics" className="m-6 my-5">
                <StatsDashboard />
            </section>
        </>
    )
}