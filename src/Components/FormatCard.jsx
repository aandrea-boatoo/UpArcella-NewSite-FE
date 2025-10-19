export default function FormatCard({ format: { title, des }, noSpaceName }) {

    return (
        <section className={`formatCard dark ${noSpaceName}`}>
            <div className="formatContent">
                <h3>{title}</h3>
                <p>{des}</p>
            </div>
        </section>
    )
}