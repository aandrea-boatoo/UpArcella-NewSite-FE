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
    console.log(events)

    const cards = events.map((event) => (
        <EventCard key={event.id} event={event} />
    ))
    const loopCards = [...cards, ...cards];
    console.log(cards)
    const cardsLooper = loopCards.map((card, e, i) => (
        <Link to={`/`} key={card.props.event.id} className="myCard m-3">
            <EventCard key={card.props.event.id} event={card.props.event} />
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
        </div>
    )
}