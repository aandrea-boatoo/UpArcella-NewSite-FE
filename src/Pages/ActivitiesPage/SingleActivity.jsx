import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
export default function SingleActivity() {

    const [activity, setActivity] = useState({})
    const { id } = useParams()
    useEffect(() => {
        fetch(`http://localhost:3000/activityGroup/${id}`)
            .then((res) => res.json())
            .then((data) => setActivity(data))
            .catch((err) => console.error("errore nel fetcch single activity:", err))
    }, [])

    return (
        <section id="singleActivity" className="m-6">
            <h1>{activity.title}</h1>
            <div className="imgContainer">
                <img src={`${activity.imgUrl}`} alt={`${activity.title}`} />
            </div>
            <div className="contentContainer">
                <p>{activity.subTitle}</p>
                <p>{activity.contacts}</p>
                <p>{activity.description}</p>
            </div>
        </section>
    )
}