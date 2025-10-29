import { Link } from "react-router-dom";

export default function GroupCard({ activity: { id, title, subTitle, imgUrl } }) {


    const thereIsImg = imgUrl ? <img src={`${imgUrl}`} alt={title} /> : <></>;
    console.log(imgUrl)
    return (
        <Link to={`/activities/${id}`} className="groupCard d-inline-block ">
            <h2>{title}</h2>
            <p className="hideSm">{subTitle}</p>
            <div className="imgContainer">
                {thereIsImg}
            </div>
        </Link>
    )
}