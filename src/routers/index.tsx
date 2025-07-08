import {Route, Routes} from "react-router";
import MainFrame from "@/frames/MainFrame.tsx";
import Home from "@/pages/Home.tsx";
import HomeNav from "@/frames/nav/HomeNav.tsx";
import Login from "@/pages/Login.tsx";
import SignUp from "@/pages/SignUp.tsx";

function IndexRouter() {
    return (
        <Routes>
            <Route element={<MainFrame />}>
                <Route element={<HomeNav />}>
                    <Route index element={<Home />} />
                    <Route path={"/login/*"} element={<Login />} />
                    <Route path={"/sign-up/*"} element={<SignUp />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default IndexRouter;