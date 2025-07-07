import { useEffect, useState } from "react"
import { DarkModeContext, type Theme, type ThemeMode } from "@/hooks/useDarkMode.ts"
import * as React from "react";

type ThemeProviderProps = {
    children?: React.ReactNode
    defaultMode?: ThemeMode
    storageKey?: string
}

function getSystemTheme(): Theme {
    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
}

function DarkModeProvider({
                           children,
                           defaultMode = "system",
                           storageKey = "vite-ui-theme",
                           ...props
                       }: ThemeProviderProps) {
    const [mode, setMode] = useState<ThemeMode>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem(storageKey) as ThemeMode) || defaultMode
        }
        return defaultMode
    })
    const [theme, setTheme] = useState<Theme>(() => (mode === "system" ? getSystemTheme() : (mode as Theme)))

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")

        let systemListener: MediaQueryList | null = null

        if (mode === "system") {
            const applySystemTheme = () => {
                const systemTheme = getSystemTheme()
                setTheme(systemTheme)
                root.classList.remove("light", "dark")
                root.classList.add(systemTheme)
            }
            applySystemTheme()
            systemListener = window.matchMedia("(prefers-color-scheme: dark)")
            systemListener.addEventListener("change", applySystemTheme)
            return () => {
                systemListener?.removeEventListener("change", applySystemTheme)
            }
        } else {
            setTheme(mode as Theme)
            root.classList.add(mode)
        }
    }, [mode])

    const value = {
        theme,
        mode,
        setMode: (newMode: ThemeMode) => {
            if (typeof window !== "undefined") {
                localStorage.setItem(storageKey, newMode)
            }
            setMode(newMode)
        },
    }

    return (
        <DarkModeContext.Provider {...props} value={value}>
            {children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeProvider