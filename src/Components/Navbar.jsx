import { NavLink } from "react-router-dom"
export default function Navbar() {

    return (
        <>
            <div id="navbarContainer">
                <div className="mainSection gap-2 gap-lg-5">
                    <NavLink to="/" className={"align-self-center"}>
                        <h1>UpArcella</h1>
                    </NavLink>
                    <div className=" align-self-center">
                        <img className="circle" src="/logoImg/upLogo.jpeg" alt="logo Up" />
                    </div>
                </div>
                <div className="menuContainer align-self-center">
                    <ul className="h-75 d-flex gap-lg-5 gap-3 justify-content-end">
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