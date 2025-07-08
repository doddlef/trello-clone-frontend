import {useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {emailActive} from "@/actions/user.ts";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from "@mui/material/Typography";
import {ResponseCode} from "@/actions/response.ts";

function EmailActive() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token");

    const { data, isPending, error } = useQuery({
        queryKey: ["emailActive", token],
        queryFn: () => {
            if (!token) throw new Error("Token is required for email activation");
            return emailActive({token});
        },
        enabled: !!token,
        retry: false,
    });

    if (isPending) return (
        <>
            <CircularProgress />
            <Typography variant={"caption"} color={"textSecondary"}>
                activating your account...
            </Typography>
        </>
    )

    if (error || !data || data.code !== ResponseCode.SUCCESS) return (
        <>
            <ErrorIcon color={"error"} sx={{fontSize: 64}}/>
            <Typography variant={"body1"}>
                {data?.message || "Failed to activate your account. Please try again later."}
            </Typography>
        </>
    )

    return (
        <>
            <CheckCircleIcon color={"success"} sx={{fontSize: 64}}/>
            <Typography variant={"body1"}>
                Your account has been successfully activated!
            </Typography>
        </>
    )
}

function Layout() {
    return (
        <div className={"w-full h-full flex items-center justify-center"}>
            <Paper
                elevation={3}
                sx={{
                    padding: 6,
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >
                <div className={"flex flex-col gap-2 items-center"}>
                    <EmailActive />
                </div>
            </Paper>
        </div>
    )
}

export default Layout;