import useAccount from "@/store/useAccount.ts";
import Loading from "@/pages/Loading.tsx";
import {Navigate, Outlet} from "react-router";

interface AuthRedirectorProps {
    /**
     * Whether to redirect if the user is authenticated.
     */
    redirectIfAuth?: boolean;

    toIfAuth?: string;

    /**
     * Whether to redirect if the user is not authenticated.
     */
    redirectIfNotAuth?: boolean;

    toIfNotAuth?: string;
}

function AuthRedirector(
    { redirectIfAuth = false, toIfAuth = "/dashboard", redirectIfNotAuth = false, toIfNotAuth = "/" }: AuthRedirectorProps
) {
    const { account, isChecked } = useAccount();

    if (!isChecked) return <div className={"w-screen h-screen"}><Loading /></div>

    if (redirectIfAuth && account) return <Navigate to={toIfAuth} />
    if (redirectIfNotAuth && !account) return <Navigate to={toIfNotAuth} />

    return <Outlet />
}

export default AuthRedirector;