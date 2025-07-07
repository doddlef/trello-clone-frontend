import {BrowserRouter} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from "notistack";
import ThemeModeProvider from "@/components/ThemeModeProvider/ThemeModeProvider.tsx";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import useDarkMode from "@/hooks/useDarkMode.ts";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";

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
    cssVariables: {
        colorSchemeSelector: "class"
    },
})

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: 'Funnel Display',
    },
    cssVariables: {
        colorSchemeSelector: "class",
    }
})

function App() {
    const { theme } = useDarkMode();
    return (
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <div className={"w-full h-full flex items-center justify-center"}>
                <ThemeSwitch />
            </div>
        </ThemeProvider>
    )
}

const queryClient = new QueryClient()

function Wrapper() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider />
                <ThemeModeProvider>
                    <App />
                </ThemeModeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default Wrapper
