import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Link as RouterLink} from "react-router";
import Link from "@mui/material/Link"

function Home() {
    return (
        <div className={"w-full h-full flex items-center justify-center gap-12"}>
            <Box
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                }}
            >
                <img src={"24045.PNG"} alt={""} width={560}/>
            </Box>
            <Box
                sx={{
                    maxWidth: 320,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 3,
                }}
            >
                <Typography variant={"h4"} fontFamily={"Sour Gummy"}>
                    TaskBoard
                </Typography>
                <Typography variant={"body1"}>
                    A Kanban application, clone of&nbsp;
                    <Link
                        component={RouterLink}
                        to={"https://trello.com/"}
                    >
                        Trello
                    </Link>
                    , built for self-learning purposes.
                </Typography>
                <Typography variant={"body1"}>
                    using Spring Boot + Kotlin as backend
                </Typography>
                <Typography variant={"body1"}>
                    using React + TypeScript as frontend
                </Typography>
            </Box>
        </div>
    )
}

export default Home;