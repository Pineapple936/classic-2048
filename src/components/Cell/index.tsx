import style from "./index.module.css";
import { ColorCell } from "@/interface";

export default function Cell({ number }: { number: number }) {
    return (
        <div className={`${style.cell} center-element`} style={{background: number < 2048? ColorCell[number] : ColorCell[2048], color: number > 4? "#f9f6f2" : "#776e65"}}>
            <p>{number === 0? "" : number}</p>
        </div>
    );
}
