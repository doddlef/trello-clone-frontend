import {Route, Routes} from "react-router";
import RootFrame from "@/frames/RootFrame.tsx";
import Home from "@/pages/Home.tsx";
import HomeNav from "@/frames/nav/HomeNav.tsx";
import {lazy, Suspense} from "react";
import Loading from "@/pages/Loading.tsx";
import EmailActive from "@/pages/auth/EmailActive.tsx";
import Dashboard from "@/pages/common/Dashboard.tsx";
import MainFrame from "@/frames/MainFrame.tsx";
import CreateBoard from "@/pages/common/CreateBoard.tsx";

const Login = lazy(() => import("../pages/auth/Login.tsx"))
const SignUp = lazy(() => import("../pages/auth/SignUp.tsx"));
const SignUpSuccess = lazy(() => import("../pages/auth/SignUpSuccess.tsx"));

function IndexRouter() {
    return (
        <Routes>
            <Route element={<RootFrame />}>
                <Route element={<HomeNav />}>
                    <Route index element={<Home />} />
                    <Route path={"/login/*"} element={
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    } />
                    <Route path={"/sign-up"}>
                        <Route index element={
                            <Suspense fallback={<Loading />}>
                                <SignUp />
                            </Suspense>
                        } />
                        <Route path={"success/*"} element={
                            <Suspense fallback={<Loading />}>
                                <SignUpSuccess />
                            </Suspense>
                        } />
                    </Route>
                    <Route path={"/email/active/*"} element={
                        <EmailActive />
                    } />
                </Route>
                <Route element={<MainFrame />}>
                    <Route path={"/dashboard/*"} element={<Dashboard />} />
                    <Route path={"/create-board/*"} element={<CreateBoard />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default IndexRouter;