import {type ApiResponse, ResponseCode} from "@/actions/response.ts";

export function getUrl(url: string): string {
    return `${import.meta.env.VITE_APP_BASE_URL}${url}`;
}

export async function tokenRefresh(): Promise<ApiResponse> {
    const response = await fetch(getUrl("/api/auth/refresh"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
    return response.json();
}

export async function refreshableResponse(
    url: string,
    init?: RequestInit,
): Promise<ApiResponse> {
    const fetchWithCreds = (u: string, i?: RequestInit) =>
        fetch(getUrl(u), { ...i, credentials: "include" });

    let response = await fetchWithCreds(url, init);

    if (response.ok) return response.json();

    let obj: ApiResponse;
    try {
        obj = await response.json();
    } catch {
        return {
            code: ResponseCode.ERROR,
            message: "Unknown error occurred",
        } as ApiResponse;
    }

    console.log("API Response:", obj);
    if (!response.ok && obj.code === ResponseCode.TOKEN_EXPIRED) {
        console.log("Token expired, attempting to refresh...");
        const refreshResponse = await tokenRefresh();
        if (refreshResponse.code === ResponseCode.SUCCESS) {
            response = await fetchWithCreds(url, init);
            if (response.ok) return response.json();
            try {
                return await response.json();
            } catch {
                return {
                    code: ResponseCode.ERROR,
                    message: "Unknown error occurred after token refresh",
                } as ApiResponse;
            }
        } else {
            return refreshResponse;
        }
    }

    return obj;
}