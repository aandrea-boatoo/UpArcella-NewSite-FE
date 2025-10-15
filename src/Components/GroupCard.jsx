import { Link } from "react-router-dom";

export default function GroupCard({ activity: { id, title, subTitle, imgUrl } }) {


    const thereIsImg = imgUrl ? <img src={`groupImg/${imgUrl}`} alt={`${title}`} /> : <></>;
    return (
        <Link to={`/activities/${id}`} className="groupCard d-inline-block ">
            <h1>{title}</h1>
            <p>{subTitle}</p>
            <div className="imgContainer">
                {thereIsImg}
            </div>
        </Link>
    )
}