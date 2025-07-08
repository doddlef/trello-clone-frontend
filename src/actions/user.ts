import type {ApiResponse} from "@/actions/response.ts";
import {refreshableResponse} from "@/actions/api.ts";

export type AccountRole = "ADMIN" | "USER"

export type Account = {
    uid: string,
    nickname: string,
    avatar?: string,
    role: AccountRole,
}

// authenticate with email and password
export type EmailPasswordAuthParams = {
    email: string;
    password: string;
}

export type EmailPasswordAuthResponse = ApiResponse & {
    data?: {
        account: Account,
    }
}

export function emailPasswordAuth({ email, password }: EmailPasswordAuthParams): Promise<EmailPasswordAuthResponse> {
    return fetch("/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        }),
        credentials: "include",
    }).then(response => response.json());
}

// get account info
export type GetAccountInfoResponse = ApiResponse & {
    data?: {
        account: Account,
    }
}

export function getAccountInfo(): Promise<GetAccountInfoResponse> {
    return refreshableResponse("/api/account/me", {
        method: "GET",
    })
}

// logout
export function logout(): Promise<ApiResponse> {
    return fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    }).then(response => response.json());
}

// register with email and password
export type EmailPasswordRegisterParams = {
    email: string;
    password: string;
    nickname: string;
}

export type EmailPasswordRegisterResponse = ApiResponse & {
    data?: {
        uid: string,
    }
}

export function emailPasswordRegister(
    { email, password, nickname }: EmailPasswordRegisterParams
): Promise<EmailPasswordRegisterResponse> {
    return fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            nickname
        }),
        credentials: "include",
    }).then(response => response.json());
}

// activate email
export type EmailActiveParams = {
    token: string;
}

export type EmailActiveResponse = ApiResponse & {
    data?: {
        account: Account,
    }
}

export function emailActive({ token }: EmailActiveParams): Promise<EmailActiveResponse> {
    return fetch("/api/auth/active-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        }),
        credentials: "include",
    }).then(response => response.json());
}

// resend activation email
export type ResendActivationEmailResponse = ApiResponse & {
    data?: {
        uid: string,
    }
}

export function resendActivationEmail(email: string): Promise<ResendActivationEmailResponse> {
    return fetch(`/api/auth/resend-email-token?email=${email}`, {
        method: "GET",
        credentials: "include",
    }).then(response => response.json());
}