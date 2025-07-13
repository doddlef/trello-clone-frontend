import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Dashboard() {
    return (
        <Container
            sx={{
                paddingTop: 2,
                minHeight: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    overflow: "hidden",
                    borderRadius: 2,
                    width: "80%",
                }}
            >
                <img src={"24045.PNG"} alt={"welcome"} />
            </Box>
        </Container>
    )
}

export default Dashboard;