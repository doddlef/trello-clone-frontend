import AuthOnlyRouter from "@/components/wrapper/AuthOnlyRouter.tsx";
import HeadNav from "@/components/common/nav/HeadNav.tsx";
import SideNav from "@/components/common/nav/SideNav.tsx";
import { Outlet } from "react-router";

function MainFrame() {
    return (
        <div className={"w-screen h-screen relative flex flex-col"}>
            <HeadNav />
            <div className={"grow w-full overflow-hidden flex flex-row justify-start"}>
                <SideNav />
                <Outlet />
            </div>
        </div>
    )
}

function Wrapper() {
    return (
        <AuthOnlyRouter>
            <MainFrame />
        </AuthOnlyRouter>
    )
}

export default Wrapper;