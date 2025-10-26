import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
export default function MainEventCard({ event: { title, place, dates, imgUrl }, }) {
    // gestione tag

    // gestione date
    const thereIsDates = dates ? <p><FontAwesomeIcon icon={faCalendarDays} />
        {dates}</p> : <p></p>;
    // gestione luoghi
    const thereIsPlace = place ? <p><FontAwesomeIcon icon={faLocationDot} />
        {place}</p> : <p></p>;
    return (
        <>
            <h3 className="h5">{title}</h3>
            <div>
                {thereIsDates}
                {thereIsPlace}
            </div>
            {imgUrl ?
                <div className="imgContainer m-auto w-75">
                    <img src={`${imgUrl}`} alt="foto evento" />
                </div> :
                <div>{imgUrl}</div>
            }
        </>
    )
}