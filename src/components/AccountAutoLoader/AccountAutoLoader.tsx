import {useQuery} from "@tanstack/react-query";
import {getAccountInfo} from "@/actions/user.ts";
import useAccount from "@/store/useAccount.ts";
import * as React from "react";

function AccountAutoLoader() {
    const { setAccount, isChecked } = useAccount();

    const { data: res, isPending, error } = useQuery({
        queryKey: ['account'],
        queryFn: getAccountInfo,
        retry: false,
        enabled: !isChecked,
    });

    React.useEffect(() => {
        if (isPending) return
        if (error) {
            console.error(error);
            setAccount(null);
        } else {
            setAccount(res?.data?.account ?? null);
        }

        if (res) {
            console.log("response[", res.code, "]: ", res?.message);
        }
    }, [res, isPending, error, setAccount])

    return <></>
}

export default AccountAutoLoader;