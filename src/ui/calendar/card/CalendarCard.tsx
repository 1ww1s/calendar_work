import { FC } from "react";
import classes from './card.module.scss'
import { IData } from "../../../model/types";
import { getData } from "../../../lib/helpers/getData";

interface IProps {
    list: IData[];
    selectedDay: string;
}

export const CalendarCard: FC<IProps> = ({list,selectedDay}) => {

    if(!selectedDay){
        return <></>
    }

    const date = new Date(selectedDay)
    const data = getData(list, selectedDay)

    return (
        <section className={classes.container}>
            <h2>Выбранная дата:</h2>
            <p className={classes.selectedDay}>{date.getDate()} {date.toLocaleString('default', {month: 'long'})} {date.getFullYear()}</p>
            {
                data
                    &&
                <section className={classes.name}>
                    {data.name}
                </section>
            }
        </section>  
    )
}