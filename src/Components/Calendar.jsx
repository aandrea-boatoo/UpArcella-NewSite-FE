import { useState, useEffect } from "react"
export default function Calendar() {
    const [orari, setOrari] = useState({});
    useEffect(() => {
        fetch(`http://localhost:3000/messe`)
            .then((res) => res.json())
            .then((data) => setOrari(data))
            .catch((err) => console.error("errore fetch orari:", err))
    }, [])
    const calendars = [
        {
            id: "dDlkMjM4MjNndXRodDFrNzhoMzI0ZXZyNzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
            title: "San Bellino",
            color: "fce921"
        },
        {
            id: "dDE1YjQ4YTFxOWZuZGpnYzZxcGlsY2dkdTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
            title: "San Bellino Ord.",
            color: "f9f088"
        },
        {
            id: "ZG5zNmRtOG9yNDNsN2cyY3NlcnNocDhnZDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
            title: "San Filippo Neri",
            color: "0dc991"
        },
        {
            id: "ZWIzYXBiZ2Z2YTBpNTFtNnUzbmptNmNqbGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
            title: "San Filippo Neri Ord.",
            color: "70cdb1"
        },
        {
            id: "bzJiOXZjZW9vZm9wcWNtazY5NjA2ZDg1c2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
            title: "Santissima Trinità",
            color: "3a86ff"
        },
        {
            id: "ZDFkcjVoa3N1ZjVmcTI5b2tscmtlMGw0cThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
            title: "Santissima Trinità Ord.",
            color: "5e9bff"
        },
        {
            id: "Yzc3OTYwMWJjOTBjYWE0YjYyMDVkYjc4YzI0OTI3YWMxY2JlODdiOWY2NjkyZjliY2Q2YjczYjZmZGRjNmI3MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
            title: "Azione Cattolica",
            color: "ef6c01"
        },
        {
            id: "N2YzMjQ0MTJjYTZmN2VjN2UwMmY4OTE5NmMwNGQ2NmZmMzQ2MDgzMWU3NzdiMmE1OTU2YWYyODk4NDVjNTAzZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
            title: "Scout",
            color: "ef6c00"
        },
        {
            id: "ZjZzOHZlZnQ3OTAzbTR0ajBrZGQzYXJldDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
            title: "Attività extra",
            color: "3f51b5"
        }
    ]
    const [showCalendarId, setShowCalendarId] = useState(calendars.map((c) => c.id));
    const [showCalendarColor, setShowCalendarColor] = useState(calendars.map((c) => c.color));
    const urlBase = "https://calendar.google.com/calendar/embed?height=500&wkst=2&ctz=Europe%2FRome&showPrint=0&showTz=0&";
    const srcColorParams = calendars
        .filter(c => showCalendarId.includes(c.id)).map(c => `src=${(c.id)}&color=%23${c.color}&`);
    const calendarsUrl = srcColorParams.toString().replaceAll(",", "")
    const url = `${urlBase}${calendarsUrl}`;
    const calendarToggle = (id, color) => {
        setShowCalendarId(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
        setShowCalendarColor(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    }
    const orMes = Object.keys(orari).length !== 0 ? orari :
        {
            "Lunedi": {
                "Santa": "",
                "Sanbe": "",
                "Sanfi": ""
            },
            "Martedi": {
                "Santa": "",
                "Sanbe": "",
                "Sanfi": ""
            },
            "Mercoledi": {
                "Santa": "",
                "Sanbe": "",
                "Sanfi": ""
            },
            "Giovedi": {
                "Santa": "",
                "Sanbe": "",
                "Sanfi": ""
            },
            "Venerdi": {
                "Santa": "",
                "Sanbe": "",
                "Sanfi": ""
            },
            "Sabato": {
                "Santa": "",
                "Sanbe": "",
                "Sanfi": ""
            },
            "Domenica": {
                "Santa": "",
                "Sanbe": "",
                "Sanfi": "10.00"
            }
        }
    console.log(orMes)
    return (
        <section id="calendar" className="m-6 my-3">
            <h2>I nostri appuntamenti</h2>
            <div id="orariMesse" className="my-3">
                <table>
                    <tr>
                        <th>Messe</th>
                        <th>SanBe</th>
                        <th>Santa</th>
                        <th>SanFi</th>
                    </tr>
                    <tr>
                        <th>Lunedì</th>
                        <td>{orMes.Lunedi.Sanbe}</td>
                        <td>{orMes.Lunedi.Santa}</td>
                        <td>{orMes.Lunedi.Sanfi}</td>
                    </tr>
                    <tr>
                        <th>Martedì</th>
                        <td>{orMes.Martedi.Sanbe}</td>
                        <td>{orMes.Martedi.Santa}</td>
                        <td>{orMes.Martedi.Sanfi}</td>
                    </tr>
                    <tr>
                        <th>Mercoledì</th>
                        <td>{orMes.Mercoledi.Sanbe}</td>
                        <td>{orMes.Mercoledi.Santa}</td>
                        <td>{orMes.Mercoledi.Sanfi}</td>
                    </tr>
                    <tr>
                        <th>Giovedì</th>
                        <td>{orMes.Giovedi.Sanbe}</td>
                        <td>{orMes.Giovedi.Santa}</td>
                        <td>{orMes.Giovedi.Sanfi}</td>
                    </tr>
                    <tr>
                        <th>Venerdì</th>
                        <td>{orMes.Venerdi.Sanbe}</td>
                        <td>{orMes.Venerdi.Santa}</td>
                        <td>{orMes.Venerdi.Sanfi}</td>
                    </tr>
                    <tr>
                        <th>Sabato</th>
                        <td>{orMes.Sabato.Sanbe}</td>
                        <td>{orMes.Sabato.Santa}</td>
                        <td>{orMes.Sabato.Sanfi}</td>
                    </tr>
                    <tr>
                        <th>Domenica</th>
                        <td>{orMes.Domenica.Sanbe}</td>
                        <td>{orMes.Domenica.Santa}</td>
                        <td>{orMes.Domenica.Sanfi}</td>
                    </tr>
                </table>
            </div>
            <div className="calendarContainer d-flex justify-content-between align-items-stretch">
                <iframe src={url}></iframe>
                <div id="handingCalendar" className="hideLg hideSm">
                    <div className="my-4 d-flex row py-4 justify-content-center align-content-stretch">
                        {calendars.map(cal => (
                            <div key={cal.id} className={`singleCalendar c${cal.color} my-2 py-1 px-1`}>
                                <label key={cal.id}>
                                    <input
                                        type="checkbox"
                                        checked={showCalendarId.includes(cal.id, cal.color)}
                                        onChange={() => calendarToggle(cal.id)}
                                    />{" "}
                                    {cal.title}
                                </label> <br />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}