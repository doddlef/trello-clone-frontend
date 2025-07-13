import useAccount from "@/store/useAccount.ts";
import Loading from "@/pages/Loading.tsx";
import {Navigate} from "react-router";

function AuthOnlyRouter( {children} : {children: React.ReactNode}) {
    const { account, isChecked } = useAccount();
    if (!isChecked) return <Loading />
    if (!account) return <Navigate to={"/login"} />
    return children;
}

export default AuthOnlyRouter;