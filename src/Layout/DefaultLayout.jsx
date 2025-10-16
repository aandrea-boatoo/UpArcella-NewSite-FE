import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import MyFooter from "../Components/MyFooter";

export default function DefaultLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <MyFooter />
        </>
    )
}