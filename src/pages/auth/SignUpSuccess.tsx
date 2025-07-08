import Typography from "@mui/material/Typography";
import {useSearchParams} from "react-router";
import StatusLayout from "@/layouts/StatusLayout.tsx";

function SignUpSuccess() {
    const [searchParams] = useSearchParams();
    const accountUid = searchParams.get("accountUid");

    // TODO: redirect to 404 if accountUid is not provided or invalid
    if (!accountUid) return <div>empty</div>

    return (
        <StatusLayout variant={"success"}>
            <div className={"flex flex-col items-start justify-center gap-1"}>
                <Typography variant={"h4"}>
                    Well done! Almost there!
                </Typography>
                <Typography>
                    An email has been sent to you, please follow the instructions to active your account.
                </Typography>
                <Typography variant={"caption"} color={"textSecondary"}>
                    account UID: <strong>{accountUid}</strong>
                </Typography>
            </div>
        </StatusLayout>
    )
}

export default SignUpSuccess;