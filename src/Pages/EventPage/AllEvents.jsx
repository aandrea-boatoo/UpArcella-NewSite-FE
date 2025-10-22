import { Link } from "react-router-dom";
import MainEventCard from "../../Components/MainEventCard";
import Event from '../../data/Events';
export default function AllEvents() {
    const eventsList = Event();
    const cards = eventsList.map((event) => (

        <MainEventCard key={event.id} event={event} />
    ))
    const allCards = cards.map((card, i) => {
        const tags = card.props.event.tags ? JSON.parse(card.props.event.tags) : [];
        return (
            <Link to={`/event/${card.props.event.id}`} key={i} className="myCard position-relative m-3">
                <MainEventCard key={i} event={card.props.event} />
                <div id="tagsSection" className="position-absolute myCardTag">
                    {tags.map((t, index) => (
                        <span id={t} className="defaultColor" key={index}>
                            {t}
                        </span>
                    ))}
                </div>
            </Link>
        )
    })
    return (
        <section id="allEvents" className="m-6">
            <h2>Tutte le nostre proposte e appuntamenti:</h2>
            <div className="cardList d-flex justify-content-around flex-wrap">
                {allCards}
            </div>
        </section>
    )
}