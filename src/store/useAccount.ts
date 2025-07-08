import type {Account} from "@/actions/user.ts";
import {create} from "zustand/react";

interface AccountState {
    /**
     * The current account information.
     * If the user is logged in, this will contain the account details.
     * If the user is not logged in, this will be null.
     * If undefined, it means the account information is being fetched.
     */
    account?: Account | null,
    isChecked: boolean,
    setAccount: (account: Account | null) => void,
}

const useAccount = create<AccountState>((set) => ({
    account: undefined,
    isChecked: false,
    setAccount: (account: Account | null) => {
        set({
            account,
            isChecked: true,
        });
    }
}))

export default useAccount;