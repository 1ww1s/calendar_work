import { FC, useState } from "react";
import classes from './wrap.module.scss'
import { Calendar } from "../calendar/Calendar";
import { CalendarCard } from "../card/CalendarCard";
import { IData } from "../../../model/types";
import { ExportComponent } from "../../export";
import { Import } from "../../import";

interface IProps {
    selectedId: number | null;
    list: IData[];
    setList: (list: IData[]) => void;
}

export const Wrap: FC<IProps> = ({selectedId, list, setList}) => {

    const [selectedDay, setSelectedDay] = useState<string>("")
    
    return (
        <section className={classes.wrapper}>
            <Calendar 
                list={list}
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay} 
                selectedId={selectedId} 
            />
            <section className={classes.data}>
                <CalendarCard 
                    list={list}
                    selectedDay={selectedDay} 
                />
                <section className={classes.files}>
                    <ExportComponent />
                    <Import
                    setList={setList} 
                    />
                </section>
            </section>
        </section>
    )
}