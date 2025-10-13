export default function SpuntiCard({ spunto: { title, subtitle, created_at } }) {

    const thereIsSubtitle = subtitle ? <p>{subtitle}</p> : ''

    return (
        <div className="h-100 d-flex flex-column justify-content-around p-2">
            <h3>{title}</h3>
            {thereIsSubtitle}
            <p>{created_at}</p>
        </div>
    )
}