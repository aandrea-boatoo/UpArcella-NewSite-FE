import { useEffect, useState } from "react"
import MainEventCard from "./MainEventCard";
import { Link } from "react-router-dom";
export default function Carousel() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/events/main")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Errore fetch eventi:", err))
    }, []);
    const cards = events.map((event) => (
        <MainEventCard key={event.id} event={event} />
    ))
    const loopCards = [...cards, ...cards];
    const cardsLooper = loopCards.map((card, i) => {
        const tags = card.props.event.tags ? JSON.parse(card.props.event.tags) : [];
        return (
            <Link to={`/event/${card.props.event.id}`} key={i} className="myCard position-relative m-3">
                <MainEventCard className="position-absolute" key={i} event={card.props.event} />
                <div id="tagsSection" className="position-absolute myCardTag">
                    {tags.map((t, index) => (
                        <span className={t} key={index}>
                            {t}
                        </span>
                    ))}
                </div>
            </Link>
        )
    })

    return (

        <div className="eventList">
            <h2 className="m-6">Cosa accade in parrocchia?</h2>
            <div className="cardsContainer m-auto d-flex gap-3 overflow-hidden">
                <div className="track d-flex  w-auto">
                    {cardsLooper}
                </div>
            </div>
            <Link to={'/allEvents'} className=" position-absolute end-0 mt-3 seeAll">Vedi tutti...</Link >
        </div>
    )
}