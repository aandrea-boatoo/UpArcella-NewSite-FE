import SpuntiCard from "../../../Components/SpuntiCard"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function SpuntiDiRiflessione() {
    const [spunti, setSpunti] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/spunti")
            .then((res) => res.json())
            .then((data) => setSpunti(data))
            .catch((err) => console.error("Errore fetch spunti:", err));
    }, []);
    const spuntiCardList = spunti.map((spunto, i) => (
        <Link key={i} to={`/rubrica/SpuntidiRiflessione/${spunto.id}`} className="spunti card">
            <SpuntiCard key={i} spunto={spunto} />
        </Link>
    ));
    console.log(spunti)
    console.log(spuntiCardList)
    return (
        <section id="spuntiDiRiflessione" className="m-6">
            <h2 className="my-4">Spunti di riflessione</h2>
            <div className="imgContainer my-2"></div>
            <p>Questa sezione nasce dal desiderio di proporre, senza velleità, riflessioni su tematiche inerenti alla Chiesa e all'Attualità anche molto vicine a noi e al nostro territorio. La finalità è quella di offrire spunti di riflessioni personali che generino anche riflessioni comunitarie…</p>
            <div className="spuntiCardContainer overflow-x-hidden d-flex gap-3 flex-wrap">

                {spuntiCardList}
            </div>

        </section >
    )
}