import Paper from "@mui/material/Paper";
import {Link} from "react-router";
import useAccount from "@/store/useAccount.ts";
import ProjectIcon from "@/components/icon/ProjectIcon.tsx";
import Typography from "@mui/material/Typography";
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import IconButton from "@mui/material/IconButton";
import AccountAvatar from "@/components/common/AccountAvatar.tsx";
import ThemeSwitch from "@/components/common/ThemeSwitch.tsx";

function HeadNav() {
    const { account } = useAccount();
    if (!account) throw new Error("Account not found");

    return (
        <Paper
            elevation={2}
            sx={{borderRadius: 0}}
            className={"pl-4 pr-4 pt-2 pb-2 flex items-center sticky top-0 left-0 w-full gap-4"}
        >
            <div className={"flex items-center gap-4"}>
                <ProjectIcon fontSize={"small"}/>
                <Typography
                    variant={"subtitle1"}
                    component={Link}
                    to={"/dashboard"}
                >
                    TaskBoard
                </Typography>
            </div>
            <div className={"grow"}>
                {/*TODO: a search bar*/}
            </div>
            <div className={"flex items-center gap-2"}>
                <ThemeSwitch iconProps={{fontSize: "small"}} />
                <IconButton>
                    <ChatBubbleTwoToneIcon fontSize={"small"}/>
                </IconButton>
                <IconButton>
                    <HelpTwoToneIcon fontSize={"small"}/>
                </IconButton>
                <IconButton>
                    <AccountAvatar {...account} size={"small"}/>
                </IconButton>
            </div>
        </Paper>
    )
}

export default HeadNav;