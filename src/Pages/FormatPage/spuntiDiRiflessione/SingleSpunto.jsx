
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
export default function SingleSpunto() {
    const [spunto, setSpunto] = useState({})
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/spunti/${id}`)
            .then((res) => res.json())
            .then((data) => setSpunto(data))
            .catch((err) => console.log("errore fetch singolo spunto:", err))
    }, []);
    console.log(spunto)

    const handleLink = spunto.description && spunto.description.includes(".com") ? <Link to={spunto.description}> <p className="desText">{spunto.description}</p> </Link> : <p className="desText">{spunto.description}</p>;
    return (
        <section id="singleSpunto" className="m-6">
            <h1>{spunto.title}</h1>
            <p className="date">{spunto.created_at}</p>
            <p className="subtitle">{spunto.subtitle}</p>
            {handleLink}
        </section>
    )
}