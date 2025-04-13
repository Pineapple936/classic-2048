export const lenBoard = 4;

export interface Game {
    board: number[][];
    score: number;
    record: number;
}

export enum Keydown {
    up = "up",
    right = "right",
    left = "left",
    down = "down"
}

export const ColorCell: Record<number, string> = {
    2: "#eee4da",
    4 : "#ede0c8",
    8 : "#f2b179",
    16 : "#f79465",
    32 : "#f67c5f",
    64 : "#f65e3b",
    128 : "#edcf72",
    256 : "#edcc61",
    512 : "#edc850",
    1024 : "#edc53f",
    2048 : "#edc22e",
}
