import { Keydown, lenBoard, Game } from "@/interface";

export function initStartBoard(): number[][] {
    const board: number[][] = Array(4).fill(0).map(() =>
        Array(4).fill(0)
      );
    addCell(board);
    addCell(board);
    return board;
}

export function callbackKeydown(game: Game, direction: Keydown): Game {
    switch(direction) {
        case(Keydown.right):
            moveRight(game);
            break;
        case(Keydown.left):
            moveLeft(game);
            break;
        case(Keydown.up):
            moveUp(game);
            break;
        case(Keydown.down):
            moveDown(game);
            break;
    }
    addCell(game.board);
    localStorage.setItem("game", JSON.stringify(game));

    return {
        board: game.board,
        score: game.score,
        record: game.record > game.score? game.record : game.score,
    };
}

function addCell(board: number[][]): void {
    let x, y;

    if(board.reduce((value, item) => value += item.filter(num => num === 0).length, 0) === 0) return;

    do {
        x = Math.floor(Math.random() * (lenBoard - 0.1));
        y = Math.floor(Math.random() * (lenBoard - 0.1));
    }
    while(board[y][x] !== 0);
    board[y][x] = 2;
}

function moveRight(game: Game): void {
    for(let y = 0; y < lenBoard; y++) {
        let row = game.board[y].filter(cell => cell !== 0);
        for(let x = row.length - 1; x > 0; x--) {
            if(row[x] === row[x - 1]) {
                row[x - 1] = 0;
                row[x] *= 2;
                game.score += row[x];
                x--;
            }
        }
        row = row.filter(cell => cell !== 0);
        while(row.length < 4) row.unshift(0);
        game.board[y] = row;
    }
}

function moveLeft(game: Game): void {
    for(let y = 0; y < lenBoard; y++) {
        let row = game.board[y].filter(cell => cell !== 0);
        for(let x = 0; x < row.length - 1; x++) {
            if(row[x] === row[x + 1]) {
                row[x + 1] = 0;
                row[x] *= 2;
                game.score += row[x];
                x++;
            }
        }
        row = row.filter(cell => cell !== 0);
        while(row.length < 4) row.push(0);
        game.board[y] = row;
    }
}

function moveUp(game: Game): void {
    for(let x = 0; x < lenBoard; x++) {
        let column = [];
        for(let y = 0; y < lenBoard; y ++) {
            if(game.board[y][x] !== 0) column.push(game.board[y][x]);
        }

        for(let y = 0; y < column.length - 1; y++) {
            if(column[y] === column[y + 1]) {
                column[y + 1] = 0;
                column[y] *= 2;
                game.score += column[y];
                y++;
            }
        }
        column = column.filter(cell => cell !== 0);

        for (let y = 0; y < 4; y++) {
            game.board[y][x] = column[y] || 0;
          }
    }
}

function moveDown(game: Game): void {
    for(let x = 0; x < lenBoard; x++) {
        let column: number[] = [];
        for(let y = lenBoard - 1; y >= 0; y--) {
            if(game.board[y][x] !== 0) column.push(game.board[y][x]);
        }

        for(let y = 0; y < column.length - 1; y++) {
            if(column[y] === column[y + 1]) {
                column[y] = 0;
                column[y + 1] *= 2;
                game.score += column[y + 1];
                y++;
            }
        }
        column = column.filter(cell => cell !== 0);

        for (let y = 0; y < lenBoard; y++) {
            game.board[lenBoard - y - 1][x] = column[y] || 0;
          }
    }
}
