import { NavLink } from "react-router-dom"
export default function Navbar() {

    return (
        <>
            <div id="navbarContainer">
                <div className="mainSection m-6 gap-5 w-25">
                    <NavLink to="/" className={"align-self-center"}>
                        <h1>UpArcella</h1>
                    </NavLink>
                    <div className="w-25 align-self-center">
                        <img className="circle" src="/logoImg/upLogo.jpeg" alt="logo Up" />
                    </div>
                </div>
                <div className="menuContainer align-self-center w-75 d-inline-block">
                    <ul className="h-75 d-flex justify-content-end gap-5 pe-5">
                        <li><NavLink to="/">Spiritualità</NavLink ></li>
                        <li><NavLink to="/contatti">Contatti</NavLink ></li>
                        <li><NavLink to="/activities">Attività</NavLink ></li>
                        <li><NavLink to="/owner">?</NavLink ></li>
                    </ul>
                </div>
            </div>
        </>
    )
}