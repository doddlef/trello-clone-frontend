import type {BoardView} from "@/actions/boards.ts";
import {create} from "zustand/react";

interface BoardListState {
    list: BoardView[];
    setList: (list: BoardView[]) => void;
}

const useBoardList = create<BoardListState>((set) => ({
    list: [],
    setList: (list: BoardView[]) => {
        set({ list });
    },
}))

export default useBoardList;