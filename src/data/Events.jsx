import { useState, useEffect } from "react"
export default function Events() {
    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Errore fetch eventi:", err))
    }, []);
    console.log(events)
    return events;
}