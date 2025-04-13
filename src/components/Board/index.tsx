"use client"
import { useEffect, useState } from "react";
import style from "./index.module.css";
import Row from "../Row";
import { Keydown, Game } from "@/interface";
import { callbackKeydown, initStartBoard } from "@/utils";

export default function Board({ game, setGame }: { game: Game, setGame: (game: Game) => void } ) {
    const [animation, setAnimation] = useState<boolean>(false);
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

    const makeMove = (direction: Keydown | null) => {
        if(direction) {
            setGame(callbackKeydown(game, direction));
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            let direction: Keydown | null = null;

            switch(e.key) {
                case 'ArrowUp':
                    direction = Keydown.up;
                    break;
                case 'ArrowDown':
                    direction = Keydown.down;
                    break;
                case 'ArrowLeft':
                    direction = Keydown.left;
                    break;
                case 'ArrowRight':
                    direction = Keydown.right;
                    break;
                default:
                    return;
            }
            makeMove(direction);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [game]);

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setTouchStart({ x: touch.clientX, y: touch.clientY });
      };

      const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStart.x;
        const deltaY = touch.clientY - touchStart.y;
        const minSwipeDistance = 30;

        if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            makeMove(deltaX > 0 ? Keydown.right : Keydown.left);
          } else {
            makeMove(deltaY > 0 ? Keydown.down : Keydown.up);
          }
        }

        setTouchStart(null);
      };

    const handleRefresh = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();
        setAnimation(true);
        const newGame: Game = {
            board: initStartBoard(),
            score: 0,
            record: game.record
        };
        setGame(newGame);
        localStorage.setItem("game", JSON.stringify(newGame));

        setTimeout(() => {
            setAnimation(false);
        }, 500);
    }

    return (
        <div className={style.section} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <button className="center-element" onClick={handleRefresh}>
                <i className={`bx bx-refresh ${animation? "spin" : ""}`} aria-label="refresh board"></i>
            </button>
            <div className={style.board}>
                {game.board.map((row, index) => <Row row={row} indexRow={index} key={index} />)}
            </div>
        </div>
    )
}
