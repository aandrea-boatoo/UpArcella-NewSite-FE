import MainEventCard from "./MainEventCard";
import Events from "../data/Events";
import { Link } from "react-router-dom";
export default function Carousel() {

    const eventsList = Events().sort(function (a, b) { return a.dates.localeCompare(b.dates) });
    const postEvents = eventsList.map((e) => {
        let isPost
        const eDate = new Date(e.dates)
        const creationDate = new Date(e.createdAt);
        if (eDate > creationDate) { isPost = false } else { isPost = true };
        return (
            { ...e, isPost: isPost }
        )
    })
    const ismainEvents = postEvents.map((e) => {
        function handleMainTime() {
            const createdAt = new Date(e.createdAt);

            // Gestisce sia array che stringhe separate da virgole
            const eventDate = Array.isArray(e.dates)
                ? new Date(e.dates[0])
                : new Date(e.dates.split(', ')[0]);

            const resultDate = new Date(e.isPost ? createdAt : eventDate);

            // Aggiungi giorni a seconda del caso
            const daysToAdd = e.isPost ? 3 : 1;
            resultDate.setDate(resultDate.getDate() + daysToAdd);

            // Restituisce la data nel formato YYYY-MM-DD
            return resultDate.toISOString().slice(0, 10);
        }
        const today = new Date()
        const endDate = new Date(handleMainTime());

        if (endDate > today) {
            return (
                {
                    ...e,
                    mainTime: true,
                }
            )
        } else {
            return (
                {
                    ...e,
                    mainTime: false,
                }
            )
        }
    })
    let mainEvents = ismainEvents.filter((event) => {
        return event.mainTime === true;
    })
    if (mainEvents.length < 5) {
        mainEvents = eventsList.slice(0, 5);
    }
    const cards = mainEvents.map((event) => (
        <MainEventCard key={event.id} event={event} />
    ))
    const loopCards = window.matchMedia("(min-width: 1100px)").matches ? [...cards, ...cards] : [...cards];
    const cardsLooper = loopCards.map((card, i) => {
        const tags = card.props.event.tags ? JSON.parse(card.props.event.tags) : [];
        return (
            <Link to={`/event/${card.props.event.id}`} key={i} className="myCard position-relative m-3">
                <MainEventCard className="position-absolute" key={i} event={card.props.event} />
                <div id="tagsSection" className="position-absolute myCardTag">
                    {tags.map((t, index) => (
                        <span id={t.replaceAll(" ", "")} className="defaultColor" key={index}>
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
            <Link to={'/allEvents'} className="seeAll position-relative">Vedi tutti...</Link >
        </div>
    )
}