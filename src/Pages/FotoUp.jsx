import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
export default function FotoUp() {
    const [albumList, setAlbumList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/fotoalbum")
            .then((res) => res.json())
            .then((data) => setAlbumList(data))
            .catch((err) => console.error("errore fetch albums:", err))
    })
    const listeAlbum = albumList.map((a, i) => (
        <div key={i} className="album">
            <p>
                <strong>{a.title} </strong>
                <span className="hideSm">
                    {a.time} :
                </span>
                <Link to={a.link} > Vai all'album</Link>
            </p>
        </div>
    ))
    return (
        <section id="fotoUp" className="m-6">
            <h1>Galleria Up</h1>
            <div id="albumContainer">
                {listeAlbum}
            </div>
        </section>
    )
}