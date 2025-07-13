import type {BoardView} from "@/actions/boards.ts";
import Typography from "@mui/material/Typography";
import React from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { motion } from "framer-motion";
import {useTheme} from "@mui/material/styles";

interface BoardListProps {
    title: string;
    boards: BoardView[];
    defaultOpen?: boolean;
}


const upPath  = "M18 15L12 9L6 15"
const downPath  =  "M6 9L12 15L18 9"


function BoardList({ title, boards, defaultOpen=false } : BoardListProps) {
    const [open, setOpen] = React.useState(defaultOpen);
    const { palette } = useTheme();
    return (
        <React.Fragment>
            <div className={"w-full flex items-center justify-between cursor-pointer p-2"} onClick={() => setOpen(!open)}>
                <Typography
                    variant={"subtitle2"}
                    color={"textSecondary"}
                >
                    {title}
                </Typography>
                <div>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            animate={{
                                d: open ? upPath : downPath,
                                stroke: palette.text.primary,
                                strokeWidth: 2,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }}
                        />
                    </svg>
                </div>
            </div>
            <Collapse in={open} timeout={"auto"} unmountOnExit>
                <List
                    component={"div"}
                    disablePadding
                >
                    {boards.map((board: BoardView) => (<BoardItem key={board.boardId} board={board} />))}
                </List>
            </Collapse>
        </React.Fragment>
    )
}

function BoardItem({ board } : {board: BoardView}) {
    return (
        <ListItemButton
            sx={{
                borderRadius: 1,
            }}
        >
            <ListItemIcon>
                {board.starred
                    ? <StarIcon />
                    : <CalendarTodayRoundedIcon />
                }
            </ListItemIcon>
            <ListItemText secondary={board.role.toLowerCase()}>
                <Typography color={"textPrimary"}>
                    {board.title}
                </Typography>
            </ListItemText>
        </ListItemButton>
    )
}

export default BoardList