import Paper from "@mui/material/Paper";
import * as React from "react";

interface AuthFormLayoutProps {
    children?: React.ReactNode;
}

function AuthFormLayout(
    { children }: AuthFormLayoutProps
) {
    return (
        <div className={"w-full h-full flex items-center justify-center"}>
            <Paper
                elevation={2}
                className={"border-gray-300 dark:border-gray-600"}
                sx={{
                    padding: "8px 12px",
                    borderRadius: 2,
                    borderWidth: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    width: 380,
                }}
            >
                {children}
            </Paper>
        </div>
    )
}

export default AuthFormLayout;