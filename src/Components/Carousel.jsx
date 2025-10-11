import { useEffect, useState } from "react"
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
export default function Carousel() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Errore fetch eventi:", err))
    }, [])
    const cards = events.map((event) => (
        <EventCard key={event.id} event={event} />
    ))
    const loopCards = [...cards, ...cards];
    const cardsLooper = loopCards.map((card, i) => (
        <Link to={`/event/${card.props.event.id}`} key={i} className="myCard m-3">
            <EventCard className="position-absolute" key={i} event={card.props.event} />
        </Link>
    ))

    return (

        <div className="eventList">
            <h2>Prossimi Eventi</h2>
            <div className="cardsContainer m-auto d-flex gap-3 overflow-hidden">
                <div className="track d-flex  w-auto">
                    {cardsLooper}
                </div>
            </div>
            <Link to={'/allEvents'} className=" position-absolute end-0 mt-3 seeAll">Vedi tutti...</Link >
        </div>
    )
}