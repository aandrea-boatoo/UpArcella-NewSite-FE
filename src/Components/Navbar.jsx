import { NavLink } from "react-router-dom"
export default function Navbar() {

    return (
        <>
            <div id="navbarContainer">
                <div className="mainSection justify-content-around gap-4 w-25 ps-5">
                    <div className="w-25 align-self-center">
                        <img src="/logoImg/upLogo.jpeg" alt="logo Up" />
                    </div>
                    <NavLink to="/" className={"align-self-center"}>
                        <h1>UpArcella</h1>
                    </NavLink>
                </div>
                <div className="menuContainer align-self-center w-75 d-inline-block">
                    <ul className="h-75 d-flex justify-content-end gap-5 pe-5">
                        <li><NavLink to="/">Spiritualità</NavLink ></li>
                        <li><NavLink to="/">Consiglio Pastorale</NavLink ></li>
                        <li><NavLink to="/">Attività</NavLink ></li>
                        <li><NavLink to="/">Comunità</NavLink ></li>
                        <li><NavLink to="/">Contatti</NavLink ></li>
                        <li><NavLink to="/">?</NavLink ></li>
                    </ul>
                </div>
            </div>
        </>
    )
}