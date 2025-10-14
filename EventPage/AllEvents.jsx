import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import EventCard from "../../Components/EventCard";
export default function AllEvents() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Errore fetch eventi:", err))
    }, []);

    console.log(events)
    const cards = events.map((event) => (
        <EventCard key={event.id} event={event} />
    ))
    const allCards = cards.map((card, i) => (
        <Link to={`/event/${card.props.event.id}`} key={i} className="myCard m-3">
            <EventCard className="position-absolute" key={i} event={card.props.event} />
        </Link>
    ))
    return (
        <>
            <h2>Tutte le nostre proposte e appuntamenti:</h2>
            <div className="cardList d-flex flex-wrap">
                {allCards}
            </div>
        </>
    )
}