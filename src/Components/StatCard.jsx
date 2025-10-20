export function StatCard({ title, value, variant }) {
    return (
        <div className={`card text-center border-${variant} shadow-sm`}>
            <div className={`card-body text-${variant}`}>
                <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
                <h2 className="card-title fw-bold">{value}</h2>
            </div>
        </div>
    );
}
