export type ApiResponse = {
    code: ResponseCode,
    message?: string,
}

export const ResponseCode = {
    SUCCESS: 0,
    ERROR: 1,
    BUSINESS_ERROR: 1001,
    BAD_ARGUMENT: 1002,
    ACCESS_DENIED: 2,
    TOKEN_EXPIRED: 2001,
    BAD_CREDENTIALS: 2002,
    EMAIL_NOT_VERIFIED: 2003,
    NEED_LOGIN: 2010,
} as const;

export type ResponseCode = typeof ResponseCode[keyof typeof ResponseCode];