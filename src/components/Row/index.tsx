import style from "./index.module.css";
import Cell from "../Cell";

export default function Row({ row, indexRow }: { row: number[], indexRow: number }) {
    return(
        <div className={style.row}>
            {row.map((item, indexColumn) => <Cell number={item} key={`${indexColumn}-${indexRow}`} />)}
        </div>
    );
}
