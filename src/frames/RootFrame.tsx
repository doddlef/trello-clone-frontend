import Box from "@mui/material/Box";
import {Outlet} from "react-router";

function RootFrame() {
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                minWidth: "100vw",
                position: "relative",
                p: 0,
                m: 0,
            }}
        >
            <Outlet />
        </Box>
    )
}

export default RootFrame;