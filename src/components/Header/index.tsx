import style from "./index.module.css";

export default function Header({ score, record }: {score: number, record: number}) {
    return (
        <div className={style.header}>
            <span>2048</span>
            <div className={style.info}>
                <div className={`${style.card} center-element`}>
                    <p>Score</p>
                    <p>{score}</p>
                </div>
                <div className={`${style.card} center-element`}>
                    <p>Record</p>
                    <p>{record}</p>
                </div>
            </div>
        </div>
    );
}
