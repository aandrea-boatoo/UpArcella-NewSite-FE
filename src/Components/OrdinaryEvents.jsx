import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import EventCard from "./EventCard"
export default function OrdinaryEvents() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/events/ordinary")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("errore nel fetch eventi ordinari:", err))
    }, [])
    const cards = events.map((e, i) => (
        <Link to={`/event/${e.id}`} key={i} className="eventCard d-inline-block  m-3">
            <EventCard className="position-absolute" key={i} event={e} />
        </Link>
    ))
    return (
        < section id="ordinaryEvents" className="m-6" >
            {console.log(events)}
            <h2> Altre proposte....</h2 >
            <div className="d-flex align-content-stretch flex-wrap gap-4">
                {cards}
            </div>
        </section >
    )
}