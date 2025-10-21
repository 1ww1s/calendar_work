import { FC, useState } from "react";
import classes from './wrap.module.scss'
import { Calendar } from "../calendar/Calendar";
import { CalendarCard } from "../card/CalendarCard";
import { IData } from "../../../model/types";

interface IProps {
    selectedId: number | null;
    list: IData[];
}

export const Wrap: FC<IProps> = ({selectedId, list}) => {

    const [selectedDay, setSelectedDay] = useState<string>("")
    
    return (
        <section className={classes.wrapper}>
            <Calendar 
                list={list}
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay} 
                selectedId={selectedId} 
            />
            <CalendarCard 
                list={list}
                selectedDay={selectedDay} 
            />
        </section>
    )
}