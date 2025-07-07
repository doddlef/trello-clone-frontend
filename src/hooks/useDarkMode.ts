import {createContext, useContext} from "react";

export type Theme = "dark" | "light"
export type ThemeMode = Theme | "system"

type DarkModeContextType = {
    theme: Theme,
    mode: ThemeMode,
    setMode: (mode: ThemeMode) => void
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null)

const useDarkMode = () => {
    const context = useContext(DarkModeContext)

    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}

export default useDarkMode