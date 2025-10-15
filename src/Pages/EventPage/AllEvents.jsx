import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import MainEventCard from "../../Components/MainEventCard";
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
        <MainEventCard key={event.id} event={event} />
    ))
    const allCards = cards.map((card, i) => (
        <Link to={`/event/${card.props.event.id}`} key={i} className="myCard m-3">
            <MainEventCard key={i} event={card.props.event} />
        </Link>
    ))
    return (
        <section id="allEvents" className="m-6">
            <h2>Tutte le nostre proposte e appuntamenti:</h2>
            <div className="cardList d-flex justify-content-around flex-wrap">
                {allCards}
            </div>
        </section>
    )
}