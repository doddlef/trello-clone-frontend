import Paper from "@mui/material/Paper";
import {Link, Navigate, Outlet} from "react-router";
import ProjectIcon from "@/components/ProjectIcon/ProjectIcon.tsx";
import Button from "@mui/material/Button";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";
import useAccount from "@/store/useAccount.ts";
import Loading from "@/pages/Loading.tsx";
import Typography from "@mui/material/Typography";

function HomeNav() {
    const { account, isChecked } = useAccount();

    if (!isChecked) return <div className={"w-screen h-screen"}><Loading /></div>
    if (account) return <Navigate to={"/dashboard"} />

    return (
        <div className={"w-screen h-screen relative flex flex-col"}>
            <Paper
                elevation={2}
                sx={{borderRadius: 0}}
                className={"pl-4 pr-4 pt-2 pb-2 flex items-center sticky top-0 left-0 w-full gap-4"}
            >
                <div className={"flex items-center gap-4"}>
                    <ProjectIcon fontSize={"small"}/>
                    <Typography
                        variant={"subtitle1"}
                        component={Link}
                        to={"/"}
                    >
                        TaskBoard
                    </Typography>
                </div>
                <div className={"grow"} />
                <div className={"flex items-center gap-6"}>
                    <Typography
                        variant={"subtitle2"}
                        component={Link}
                        to={"/about"}
                    >
                        About
                    </Typography>
                    <Typography
                        variant={"subtitle2"}
                        component={Link}
                        to={"/login"}
                    >
                        Log in
                    </Typography>
                    <Button
                        variant={"contained"}
                        component={Link}
                        to={"/sign-up"}
                    >
                        Start for free
                    </Button>
                </div>
                <div>
                    <ThemeSwitch />
                </div>
            </Paper>
            <div className={"grow w-full"}>
                <Outlet />
            </div>
        </div>
    )
}

export default HomeNav;