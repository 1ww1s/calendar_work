import { FC, PropsWithChildren } from "react";
import classes from './myButton.module.scss'

interface IProps{
    onClick?: () => void;
    error?: string;
}

export const MyButton: FC<IProps & PropsWithChildren> = ({onClick, error, children}) => {



    return (
        <section className={classes.container}>
            <button onClick={onClick} >{children}</button>
            {error && <span className={classes.error}>*{error}</span>}
        </section>
    )
}