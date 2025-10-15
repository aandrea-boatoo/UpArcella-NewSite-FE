import { useState, useEffect } from "react";
import GroupCard from "../../Components/GroupCard";
export default function ActivityGroup() {
    const [activities, setActivities] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/activityGroup')
            .then((res) => res.json())
            .then((data) => setActivities(data))
            .catch((err) => console.error("Errore fetch gruppi:", err))
    }, [])
    const groupCardList = activities.map((a, i) => (
        <GroupCard key={i} activity={a}></GroupCard>
    ))
    console.log(activities)
    return (
        <section id="activityGroup" className="m-6">
            <h1>Attivita'</h1>
            <div id="groupCardContainer" className="d-flex justify-content-around align-content-stretch flex-wrap">

                {groupCardList}
            </div>
        </section>
    )
}