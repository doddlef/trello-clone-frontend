import type {ApiResponse} from "@/actions/response.ts";
import {refreshableResponse} from "@/actions/api.ts";

export type MembershipRole = "ADMIN" | "MEMBER" | "VIEWER";

export type BoardView = {
    boardId: string;
    title: string;
    description?: string;
    closed: boolean;
    userUid: string;
    role: MembershipRole;
    starred: boolean;
}

export type CreateBoardParams = {
    title: string;
    description?: string | null;
}

export type CreateBoardResponse = ApiResponse & {
    data?: {
        board: BoardView;
    }
}

export function createBoard({ title, description = null }: CreateBoardParams): Promise<CreateBoardResponse> {
    const body: CreateBoardParams = { title };
    if (description && description.trim() !== "") {
        body.description = description;
    }
    return refreshableResponse("/api/v1/board", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    });
}

export type UpdateBoardParams = {
    boardId: string;
    title?: string;
    description?: string;
}

export function updateBoard({ boardId, title, description }: UpdateBoardParams): Promise<ApiResponse> {
    return refreshableResponse(`/api/v1/board/${boardId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
        }),
    })
}

export type BoardListResponse = ApiResponse & {
    data?: {
        boards: BoardView[];
    }
}

export function boardList(): Promise<BoardListResponse> {
    return refreshableResponse("/api/v1/board-list", {
        method: "GET",
    })
}