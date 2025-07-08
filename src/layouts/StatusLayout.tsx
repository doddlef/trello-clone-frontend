import * as React from "react";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface StatusLayoutProps {
    variant: "success" | "error",
    children?: React.ReactNode
}

const successIcon = (<CheckCircleIcon color={"success"} sx={{fontSize: 96}}/>)
const errorIcon = (<ErrorIcon color={"error"} sx={{fontSize: 96}} />)

function StatusLayout(
    { variant, children }: StatusLayoutProps
) {
    const icon = variant === "success" ? successIcon : errorIcon;
    
    return (
        <div className={"w-full h-full flex items-center justify-center"}>
            <Paper
                sx={{
                    minWidth: 560,
                    minHeight: 320,
                }}
                elevation={4}
                className={"flex pl-12 pr-12 flex-row items-center justify-center gap-4"}
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.2,
                        rotate: 360,
                        x: -100,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        x: 0,
                        transition: {
                            duration: 0.6,
                        }
                    }}
                >
                    {icon}
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.6,
                            delay: 0.2,
                        }
                    }}

                >
                    {children}
                </motion.div>
            </Paper>
        </div>
    )
}

export default StatusLayout;