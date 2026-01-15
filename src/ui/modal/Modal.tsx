import { FC } from "react";
import classes from './modal.module.scss'
import { createPortal } from "react-dom";

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    question: string;
    onDelete: () => void;
}

export const Modal: FC<IProps> = ({question, setOpen, open, onDelete}) => {

    return  (
        open
            ?
        createPortal(
            <section className={classes.modal}>
                <section className={classes.content}>
                    <section className={classes.title}>{question}</section>
                    <section className={classes.buttons}>
                        <button onClick={() => setOpen(false)} className={classes.no}>Нет</button>
                        <button onClick={onDelete} className={classes.yes}>Да</button>
                    </section>
                </section>
                <section onClick={() => setOpen(false)} className={classes.darken}  />
            </section>,
            document.body
        )
            :
        <></>
    )
}