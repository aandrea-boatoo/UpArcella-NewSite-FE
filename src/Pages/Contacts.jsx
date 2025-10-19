import { Link } from "react-router-dom"
export default function Contacts() {

    return (
        <section id="Contacts" className="m-6">
            <h1>Contatti</h1>
            <div className="contactContainer d-flex flex-wrap justify-content-around">
                <div className="social Contact">
                    <h2>Pagine Social</h2>
                    <p><Link to={'https://www.instagram.com/up_arcella/?hl=it'}>Instagram - @uparcella</Link></p>
                    <p><Link to={'https://www.facebook.com/UPArcella'}>Facebook - UPArcella</Link></p>
                </div>
                <div className="sito Contact">
                    <h2>Contatto Amministrativo Sito</h2>
                    <Link to={'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=sitouparcella@gmail.com'}>sitouparcella@gmail.com</Link>
                </div>
                <div className="san be">
                    <h2>San Bellino</h2>
                    <p>Indirizzo: Via J. della Quercia 24/c 35134 Padova</p>
                    <p>Orari segreteria: Lun, Mer, Gio, Ven ore 9.30-12.00 <br />
                        Luglio e Agosto: Lun, Gio ore 9.30-12.00</p>
                    <p>Telefono: 049601948</p>
                    <p>Email: <Link to={'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=segreteriasanbellino@gmail.com'}>segreteriasanbellino@gmail.com</Link></p>
                    <p>IBAN: IT62Y0103012104000061258025 </p>
                </div>
                <div className="san fi">
                    <h2>San Filippo Neri</h2>
                    <p>Indirizzo: Via G. Paisiello 11, 35134 Padova</p>
                    <p>Orari segreteria: Lun, Mer, Gio ore 9.30-11.30</p>
                    <p>Telefono: 049601879</p>
                    <p>Email: <Link to={'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=sanfilippopd@gmail.com'}>sanfilippopd@gmail.com</Link></p>
                </div>
                <div className="san ta">
                    <h2>Santissima Trinità</h2>
                    <p> Indirizzo: Via E. Bernardi 20, 35135 Padova</p>
                    <p>Orari Segreteria: Mar Mer, Gio ore 9.30-11.30</p>
                    <p>Telefono: 049610088</p>
                    <p>Email: <Link to={'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=trinita@diocesipadova.it'}>trinita@diocesipadova.it</Link></p>
                    <p>Pagina FaceBook: <Link to={'https://www.facebook.com/Parrocchia-SS-Trinità-Padova-866038046845661'}>Parrocchia SS.Trinità</Link></p>
                </div>
            </div>

        </section>
    )
}