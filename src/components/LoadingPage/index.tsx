import style from "./index.module.css";

export default function LoadingPage() {
    return (
        <div className={style.loader}>
        <div className={style.loaderInner}>
            <div className={style.loaderLineWrap}>
                <div className={style.loaderLine} />
            </div>
            <div className={style.loaderLineWrap}>
                <div className={style.loaderLine} />
            </div>
            <div className={style.loaderLineWrap}>
                <div className={style.loaderLine} />
            </div>
            <div className={style.loaderLineWrap}>
                <div className={style.loaderLine} />
            </div>
            <div className={style.loaderLineWrap}>
                <div className={style.loaderLine} />
            </div>
        </div>
    </div>
    );
}
