import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {useQuery} from "@tanstack/react-query";
import {boardList} from "@/actions/boards.ts";
import * as React from "react";
import {ResponseCode} from "@/actions/response.ts";
import CircularProgress from "@mui/material/CircularProgress";
import {Link} from "react-router";
import BoardList from "@/components/common/BoardList.tsx";

function SideNav() {
    const { data: res, isLoading, error } = useQuery({
        queryKey: ["board-list"],
        queryFn: boardList,
        staleTime: 1000 * 60 * 5,
    });

    const grouped = React.useMemo(() => {
        if (res?.code !== ResponseCode.SUCCESS || !res.data?.boards) return null;
        const boards = res.data.boards;
        return {
            starred: boards.filter(b => b.starred),
            normal: boards.filter(b => !b.starred && !b.closed),
            closed: boards.filter(b => b.closed),
        };
    }, [res]);

    let content;
    if (isLoading) {
        content = (
            <div className={"w-full flex items-center justify-center"}>
                <CircularProgress />
            </div>
        )
    } else if (error || res?.code !== ResponseCode.SUCCESS || !res.data?.boards) {
        content = (
            <div className={"w-full h-full flex flex-col gap-2 items-center justify-center text-center"}>
                <ReportRoundedIcon color={"error"} />
                <Typography color={"error"}>
                    {res?.message || error?.message || "Failed to load boards"}
                </Typography>
            </div>
        )
    } else if (res.data.boards.length === 0 || !grouped) {
        content = (
            <div className={"w-full h-full flex flex-col gap-2 items-center justify-center text-center"}>
                <Inventory2TwoToneIcon color={"disabled"} />
                <Typography color={"textSecondary"}>
                    No boards found.
                </Typography>
            </div>
        )
    } else {
        content =(
            <>
                {grouped.starred.length > 0 && <BoardList title={"starred"} boards={grouped.starred} defaultOpen />}
                {grouped.normal.length > 0 && <BoardList title={"boards"} boards={grouped.normal} defaultOpen />}
                {grouped.closed.length > 0 && <BoardList title={"closed"} boards={grouped.closed} />}
            </>
        )
    }

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 260,
                padding: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyItems: "start",
            }}
        >
            <Button
                startIcon={<AddCircleOutlineRoundedIcon />}
                color={"primary"}
                variant="contained"
                component={Link}
                to={"/create-board"}
            >
                New Board
            </Button>
            <Divider flexItem />
            <div className={"w-full grow"}>
                {content}
            </div>
            <Divider flexItem />
            <div className={"max-w-full"}>
                <Typography variant={"caption"} color={"info"} component={"div"}>
                    Trello-clone by Kevin Feng
                </Typography>
                <Typography variant={"caption"} color={"info"} component={"div"}>
                    Visit Github repository
                </Typography>
            </div>
        </Box>
    )
}

export default SideNav