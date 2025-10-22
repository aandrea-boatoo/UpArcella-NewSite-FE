import { useState, useEffect } from 'react'
export default function HandleElement() {
    const [events, setEvents] = useState([]);
    const [activity, setActivity] = useState([]);
    const [spunti, setSpunti] = useState([]);
    const [comments, setComments] = useState([]);

    const fetchEvents = () => {
        fetch('http://localhost:3000/events')
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error('errore fetch eventi:', err))
    }

    const fetchActivity = () => {
        fetch('http://localhost:3000/activityGroup')
            .then((res) => res.json())
            .then((data) => setActivity(data))
            .catch((err) => console.error('errore fetch gruppi:', err))
    }
    const fetchSpunti = () => {
        fetch('http://localhost:3000/spunti')
            .then((res) => res.json())
            .then((data) => setSpunti(data))
            .catch((err) => console.error('errore fetch spunti:', err))
    }
    const fetchComments = () => {
        fetch('http://localhost:3000/daylyShare')
            .then((res) => res.json())
            .then((data) => setComments(data))
            .catch((err) => console.error('errore fetch commenti:', err))
    }

    useEffect(() => {
        fetchEvents();
        fetchActivity();
        fetchSpunti();
        fetchComments();
    }, [])
    const deleteEvent = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/events/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Errore nell'eliminazione dell'evento");
            const data = await res.json();
            console.log(data.message);
            setEvents(prev => prev.filter(e => e.id !== id));
        } catch (error) {
            console.error("Errore", error)
        }
    }
    const eventList = events.map((e, i) => (
        <div key={i} className='handleCard m-2'>
            <h4>{e.title}</h4>
            <p>{e.dates}</p>
            <button onClick={() => deleteEvent(e.id)}> Elimina</button>
        </div>
    ))
    const deleteSpunto = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/spunti/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Errore nell'eliminazione dello spunto");
            const data = await res.json();
            console.log(data.message);
            setSpunti(prev => prev.filter(s => s.id !== id));

        } catch (error) {
            console.error("Errore:", error)
        }
    };

    const spuntiList = spunti.map((s, i) => (
        <div key={i} className='handleCard m-2'>
            <h4>{s.title}</h4>
            <p>{s.created_at}</p>
            <button onClick={() => deleteSpunto(s.id)}> Elimina</button>
        </div>
    ));

    const deleteComment = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/daylyShare/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Errore nell'eliminazione del commento");
            const data = await res.json();
            console.log(data.message);
            setComments(prev => prev.filter(c => c.id !== id));

        } catch (error) {
            console.error("Errore:", err)
        }
    };


    const commentList = comments.map((c, i) => (
        <div key={i} className=' handleCard m-2'>
            <h4>{c.title}</h4>
            <p>{c.postDay}</p>
            <button onClick={() => deleteComment(c.id)}> Elimina</button>
        </div>
    ));

    const deleteActivity = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/activityGroup/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Errore nell'eliminazione del gruppo");
            const data = await res.json();
            console.log(data.message);
            setActivity(prev => prev.filter(a => a.id !== id));

        } catch (error) {
            console.error("Errore:", err)
        }
    };

    const activityList = activity.map((a, i) => (
        <div key={i} className='handleCard m-2'>
            <h4>{a.title}</h4>
            <p>{a.contacts}</p>
            <button onClick={() => deleteActivity(a.id)}> Elimina</button>
        </div>
    ))

    console.log(spuntiList);

    return (
        <section id='handleElement' className='m-6'>
            <h1>Gestione Elementi</h1>
            <div id="eventList">
                <h6>Eventi</h6>
                <div className="elContainer d-flex flex-wrap">
                    {eventList}
                </div>
            </div>
            <div id="activityList">
                <h6>Gruppi</h6>
                <div className="elContainer d-flex flex-wrap">
                    {activityList}
                </div>
            </div>
            <div id="spuntiList">
                <h6>Spunti di riflessione</h6>
                <div className="elContainer d-flex flex-wrap">
                    {spuntiList}
                </div>
            </div>
            <div id="commentList">
                <h6>Commenti</h6>
                <div className="elContainer d-flex flex-wrap">
                    {commentList}
                </div>
            </div>
        </section>
    )
}