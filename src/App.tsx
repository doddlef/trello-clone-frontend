import {BrowserRouter} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from "notistack";
import ThemeModeProvider from "@/components/ThemeModeProvider/ThemeModeProvider.tsx";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import useDarkMode from "@/hooks/useDarkMode.ts";
import Index from "@/routers";
import AccountAutoLoader from "@/components/AccountAutoLoader/AccountAutoLoader.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const darkTheme = createTheme({
    colorSchemes: {
        dark: true,
    },
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'Funnel Display',
    },
})

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: 'Funnel Display',
    },
})

function App() {
    const { theme } = useDarkMode();
    return (
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <Index />
        </ThemeProvider>
    )
}

const queryClient = new QueryClient()

function Wrapper() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <SnackbarProvider />
                <AccountAutoLoader />
                <ThemeModeProvider>
                    <App />
                </ThemeModeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default Wrapper
