import { FC } from "react";
import classes from './author.module.scss'


export const Author: FC = () => {


    return (
        <section className={classes.container}>
            designed by Pavel Kalashnikov v1.0
        </section>
    )
}