import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { LineChart, PieChart, Pie, Cell, Legend, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Form, Card } from "react-bootstrap"; // importa Form da bootstrap

export default function StatsDashboard() {
    const [stats, setStats] = useState(null);
    const [range, setRange] = useState('30daysAgo');
    const [loading, setLoading] = useState(false);

    const fetchStats = async (selectedRange) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/stats?range=${selectedRange}`);
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error("Errore fetch stats:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats(range);
    }, [range]);

    if (!stats) return <p className="text-center mt-5">Caricamento statistiche...</p>;

    const { totalViews, uniqueVisitors, viewsOverTime, topPages } = stats;

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Statistiche del sito</h1>

            {/* --- Selettore temporale --- */}
            <div className="mb-4 d-flex justify-content-end">
                <Form.Select
                    style={{ width: "200px" }}
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                >
                    <option value="7daysAgo">Ultimi 7 giorni</option>
                    <option value="30daysAgo">Ultimi 30 giorni</option>
                    <option value="90daysAgo">Ultimi 90 giorni</option>
                </Form.Select>
            </div>

            {/* --- Stat cards --- */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <StatCard title="Totale Views" value={totalViews} variant="primary" />
                </div>
                <div className="col-md-4">
                    <StatCard title="Visitatori Unici" value={uniqueVisitors} variant="success" />
                </div>
                <div className="col-md-4">
                    <StatCard title="Ultimo Aggiornamento" value={new Date().toLocaleDateString()} variant="secondary" />
                </div>
                <div className="col-md-4">
                    <StatCard
                        title="Numero Sessioni"
                        value={stats.totalSessions}
                        variant="info"
                    />
                </div>
                <div className="col-md-4">
                    <StatCard
                        title="Bounce Rate"
                        value={`${stats.bounceRate}%`}
                        variant="warning"
                    />
                </div>
                <div className="col-md-4">
                    <StatCard
                        title="Durata Media Sessione"
                        value={`${Math.floor(stats.averageSessionDuration / 60)} min ${Math.floor(stats.averageSessionDuration % 60)} sec`}
                        variant="secondary"
                    />
                </div>

            </div>

            {/* --- Grafico Views --- */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-3">Andamento Views</h5>
                    <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={viewsOverTime}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="views" stroke="#0d6efd" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="card shadow-sm my-4">
                {/* Device %% */}
                <div className="card-body">
                    <h5 className="card-title mb-3">Distribuzione device</h5>
                    <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={Object.entries(stats.devicePercentages).map(([key, value]) => ({ name: key, value: parseFloat(value) }))}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label={(entry) => `${entry.name}: ${entry.value}%`}
                                >
                                    {Object.keys(stats.devicePercentages).map((key, index) => {
                                        const colors = ['#0d6efd', '#198754', '#ffc107'];
                                        return <Cell key={key} fill={colors[index % colors.length]} />;
                                    })}
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* --- Top pagine --- */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-3">Top pagine più visitate</h5>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pagina</th>
                                <th className="text-end">Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topPages.map((page, i) => (
                                <tr key={page.path}>
                                    <td>{i + 1}</td>
                                    <td>{page.path}</td>
                                    <td className="text-end fw-semibold">{page.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
