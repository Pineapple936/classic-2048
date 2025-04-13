"use client"
import { useState, useEffect } from "react";
import style from "./page.module.css";
import Header from "@/components/Header";
import Board from "@/components/Board";
import LoadingPage from "@/components/LoadingPage";
import { initStartBoard } from "@/utils";
import { Game } from "@/interface";

export default function Page() {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<Game>(() => {
        if (typeof window !== "undefined") {
            const savedGame = localStorage.getItem("game");
            return savedGame ? JSON.parse(savedGame) : { board: initStartBoard(), score: 0, record: 0 };
        }
        return {
            board: initStartBoard(),
            score: 0,
            record: 0
            };
        }
    );

    useEffect(() => {
        const data = localStorage.getItem("game");
        if(data) setGame(JSON.parse(data));
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [])

    if(loading) return <LoadingPage />

    return (
        <div style={{backgroundColor: "var(--background-color-body)"}}>
            <div className={`${style.container} center-element`}>
                <Header score={game.score} record={game.record} />
                <Board  game={game} setGame={setGame} />
            </div>
        </div>
    );
}
