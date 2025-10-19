import FormatCard from "./FormatCard";
import { Link } from "react-router-dom";
export default function Format() {
    const formatList = [
        {
            title: "Spunti di Riflessione",
            des: "Alla costante ricerca di ispirazione e tematiche che uniscono l'attualità con la parola di Dio"
        },
        {
            title: "Credere Insieme",
            des: "Ogni settimana viene pubblicato il bollettino pastorale"
        },
        {
            title: "Condivisione Quotidiana",
            des: "Liturgia odierna con commenti che accompagnano la Parola"
        }]
    const formatCard = formatList.map((format, i) => {
        const noSpaceName = format.title.replaceAll(" ", "");
        return (
            <Link key={i} to={`/rubrica/${noSpaceName}`}>
                <FormatCard key={i} format={format} noSpaceName={noSpaceName} className={`formatCard ${noSpaceName}`} />
            </Link>
        )
    })
    return (
        <section id="format" className="m-6">
            <h2>Rubriche</h2>
            <p className="text-secondary">al servizio di dio</p>
            <div id="formatContainer" className="d-flex m-6 position-relative justify-content-center gap-5">
                {formatCard}
            </div>
        </section>
    )
}