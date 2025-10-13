import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
export default function SingleEvent() {
    const [event, setEvent] = useState({})
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/events/${id}`)
            .then((res) => res.json())
            .then((data) => setEvent(data))
            .catch((err) => console.err("Errore fetch singolo evento:", err));
    }, []);
    console.log(event)
    // gestione imm gruppo
    const thereIsGroupImg = event.groupImg ? <div className="imgContainer w-50">
        <img src={`/whoImg/${event.groupImg}`} alt="gruppo organizzatori" />
    </div> : <div></div>
    // gestione who
    const thereIsOrgGroup = event.orgGroup ? <section id="whoSec" className="mt-4">
        <h3>Chi c'è dietro? {event.orgGroup}</h3>
        <div id="whoContainer" className="mt-3 d-flex justify-content-around">
            <p className="w-25">{event.groupDes}</p>
            {thereIsGroupImg}
        </div>
    </section> : <div></div>;

    // gestione immagine
    const thereIsImg = event.imgUrl ? <img src={`/eventImg/${event.imgUrl}`} alt="img Evento" /> : ""
    // gestione tag
    const tagsList = event.tags ? JSON.parse(event.tags) : [];
    const tagsEvent = tagsList.map((t, i) => (
        <span className={t} key={i}>{t}</span>
    ));

    return (
        <div id="singleEventPage" className="position-relative m-6">
            <section id="tagsSection" className="position-absolute sEtags">{tagsEvent}</section>
            <h2>{event.title}</h2>
            <div className="info">
                <p>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{event.place}</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <span>{event.dates}</span>
                </p>

            </div>
            <div id="eventContainer" className="d-flex gap-5">
                <div className="imgContainer">
                    {thereIsImg}
                </div>
                <section id="textSec">
                    <div className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi a cumque tenetur magnam fugiat iusto voluptatum quasi ut quas ipsam nostrum asperiores sunt amet soluta odio quae error nesciunt, fuga non id! Dolorum cumque iste necessitatibus? Totam rerum eius inventore, aut deleniti libero temporibus architecto provident blanditiis dignissimos non quis ab eum quae assumenda autem, consectetur adipisci qui dicta sapiente delectus? Magnam laboriosam quos reiciendis nisi, tempore illo nam, corrupti suscipit ad cupiditate quia voluptatibus. Iure amet ipsam repellendus cumque incidunt eius dolore eum sunt, ipsa, voluptatum nemo dolores officiis, perspiciatis molestias corporis dicta accusamus rem officia quam quod! Blanditiis?
                    </div>
                    {thereIsOrgGroup}
                </section>
            </div>
        </div>
    )
}