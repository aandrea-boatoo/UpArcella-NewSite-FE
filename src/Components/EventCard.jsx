export default function EventCard({ event: { title, place, dates, imgUrl, tags } }) {

    const tagsList = tags.map((t, i) => (
        <p key={i}>{t}</p>
    ));

    return (
        <div className="">
            <h3 className="h5">{title}</h3>
            <div className="infoCard">
                <p>{dates}</p>
                <p>{place}</p>
                <div className="tagsContainer">{tagsList}</div>
            </div>
            {imgUrl ?
                <div className="imgContainer m-auto w-75">
                    <img src={imgUrl} alt="" />
                </div> :
                <div></div>
            }
        </div>
    )
}