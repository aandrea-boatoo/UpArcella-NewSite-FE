import { useState, useEffect } from "react";
export default function CondivisioneQuotidiana() {
    const [daylyShare, setDaylyShare] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3000/daylyShare/today`)
            .then((res) => res.json())
            .then((data) => setDaylyShare(data))
            .catch((err) => console.log("errore nel fetch share:", err))
    }, [])
    console.log(daylyShare)
    const thereIsComment = daylyShare.title ? <>
        <h2>Condivisione di oggi</h2>
        <h3 className="h5">{daylyShare.title}</h3>
        <p>{daylyShare.comment}</p>
    </> :
        <h4>Commento non presente per la liturgia di oggi</h4>
    return (
        <section id="condivisioneQuotidiana" className="m-6" >
            <h1 className="mb-5">Condivisione Quotidiana</h1>
            <div className="condContainer d-flex">
                <div className="liturgia">

                    <p className="istruction">per la liturgia completa premere qui<br /> 👇👇👇</p>
                    <iframe className="litOggi" src="https://www.lachiesa.it/liturgia-oggi.php" />
                </div>
                <div className="commento">
                    {thereIsComment}
                </div>
            </div>
        </section>
    );
}