import { FC, useState } from "react";
import classes from './calendar.module.scss'
import { Switch } from "../switch/Switch";
import { IData } from "../../../model/types";
import { getData } from "../../../lib/helpers/getData";
import { getTextColor } from "../../../lib/helpers/getTextColor";

interface IProps {
    list: IData[];
    selectedDay: string;
    setSelectedDay: (selectedDay: string) => void;
    selectedId: number | null;
}

export const Calendar: FC<IProps> = ({list, selectedDay, setSelectedDay, selectedId}) => {

    const [currentMonth, setCurrentMonth] = useState<number>(0)
    const [count, setCount] = useState(0);

    const onSelected = (dateStr: string) => {
        if(selectedId){
            const calendar_work: any = JSON.parse(localStorage.getItem('calendar_work') || "null")
            const prev = calendar_work[dateStr] as number
            if(prev){
                delete calendar_work[dateStr]
            }
            else{
                calendar_work[dateStr] = selectedId
            }
            localStorage.setItem('calendar_work', JSON.stringify(calendar_work))
            setCount(count + 1)
        }
        else{
            setSelectedDay(dateStr)
        }
    }

    const renderMonth = () => {
        const nowDate = new Date()
        const currentDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + currentMonth, nowDate.getDate())
        
        const getLiShadow = (date: Date, day: number) => {
            const dateStr = `${date.getFullYear()}-${date.toLocaleString('default', {month: '2-digit'})}-${day}`
            const data = getData(list, dateStr)
            let textColor: string | null = null; 
            if(data){
                textColor = getTextColor(data.color)
            }
            return (
                <li 
                    onClick={() => onSelected(dateStr)}
                    style={(data && textColor) ? {backgroundColor: data.color, color: textColor} : {}}
                    className={
                        classes.shadow + 
                        (dateStr === selectedDay
                            ?
                        ` ${classes.selectedDay}`
                            :
                        ''
                        )
                            +
                        (data  
                            ?
                        ` ${classes.data}`
                            :
                        ''
                        )
                    } 
                    key={day}
                >
                    {day}
                </li>
            )
        }

        const getLi = (date: Date, day: number) => {
            const dateStr = `${date.getFullYear()}-${date.toLocaleString('default', {month: '2-digit'})}-${day}`
            const data = getData(list, dateStr)
            let textColor: string | null = null; 
            if(data){
                textColor = getTextColor(data.color)
            }
            return (
                <li 
                    onClick={() => onSelected(dateStr)}
                    style={(data && textColor) ? {backgroundColor: data.color, color: textColor} : {}}
                    className={
                        ((date.getFullYear() === nowDate.getFullYear()) && 
                        (date.getMonth() === nowDate.getMonth()) && 
                        (nowDate.getDate() === day) 
                            ? 
                        classes.currentDay 
                            : 
                        '')
                            +
                        (dateStr === selectedDay
                            ?
                        ` ${classes.selectedDay}`
                            :
                        '')
                            +
                        (data  
                            ?
                        ` ${classes.data}`
                            :
                        '')
                    } 
                    key={day}
                >
                    {day}
                </li>
            )
        }

        const getOneWeek = () => {
            const date = new Date(currentDate)
            date.setMonth(date.getMonth(), 1)
            const oneDayWeek = (date.getDay() + 6) % 7
            const days: number[] = []
            for(let i = oneDayWeek; i > 0; i--){
                date.setMonth(date.getMonth(), date.getDate() - 1)
                days.unshift(date.getDate())
            }
            return days.map(d => getLiShadow(date, d))
        }

        const getLastWeek = () => {
            const date = new Date(currentDate)
            date.setMonth(date.getMonth() + 1, 0)
            const lastDayWeek = (date.getDay() + 6) % 7
            const days: number[] = []
            for(let i = 1; i < 7 - lastDayWeek; i++){
                date.setMonth(date.getMonth(), date.getDate() + 1)
                days.push(date.getDate())
            }
            return days.map(d => getLiShadow(date, d))
        }

        const getOneWeekCurrent = () => {
            const date = new Date(currentDate)
            date.setMonth(date.getMonth(), 1)
            const oneDayWeek = (date.getDay() + 6) % 7
            const days: number[] = []
            days.push(date.getDate())
            for(let i = oneDayWeek; i < 6; i++){
                date.setMonth(date.getMonth(), date.getDate() + 1)
                days.push(date.getDate())
            }
            return days.map(d => getLi(date, d))
        }

        const getWeeks = () => {
            const date = new Date(currentDate)
            date.setMonth(date.getMonth(), 1)
            date.setMonth(date.getMonth(), 7 - ((date.getDay() + 6) % 7))

            const days: React.ReactElement[] = []
            let day = date.getDate()
            date.setMonth(date.getMonth() + 1, 0)
            const lastDay = date.getDate()
            while(day < lastDay){         
                let weekDay = 0;
                const weekDays: React.ReactElement[] = []
                while(weekDay < 7){
                    weekDay++
                    day++

                    weekDays.push(getLi(date, day))

                    if(day === lastDay){
                        break
                    }
                }
                days.push(<section key={day * 10} className={classes.week}>{weekDays}</section>)
            }
            const end = days.splice(days.length - 1, 1)
            end.push(...getLastWeek())
            days.push(<section key={day * 10} className={classes.week}>{end}</section>)
            return days
        }


        return (
            <section className={classes.container}>   
                <Switch currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
                <section className={classes.calendar}>
                    <ul className={classes.header}>
                        <li>Пн</li>
                        <li>Вт</li>
                        <li>Ср</li>
                        <li>Чт</li>
                        <li>Пт</li>
                        <li>Сб</li>
                        <li>Вс</li>
                    </ul>
                    <ul className={classes.weeksContainer}>
                        <section className={classes.week}>
                            {
                                getOneWeek()
                            }
                            {
                                getOneWeekCurrent()
                            }
                        </section>
                        <section className={classes.weeks}>
                            {
                                getWeeks()
                            }
                        </section>
                    </ul>
                </section>
            </section>
        )
    }
    
    
    return (
        <section>
            {renderMonth()}
        </section>
    )
}