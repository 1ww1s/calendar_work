import { FC } from "react";
import classes from './switch.module.scss'

interface IProps {
    currentMonth: number;
    setCurrentMonth: (currentMonth: number) => void;
}

export const Switch: FC<IProps> = ({currentMonth, setCurrentMonth}) => {

    const nowDate = new Date()
    const date = new Date(nowDate.getFullYear(), nowDate.getMonth() + currentMonth)

    const onPlus = () => {
        setCurrentMonth(currentMonth + 1)
    }

    const onMinus = () => {
        setCurrentMonth(currentMonth - 1)
    }

    return (
        <section className={classes.container}>
            <svg onMouseDown={e => e.preventDefault()} onClick={onMinus} width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 26L10 16L20 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className={classes.month}>
                {date.toLocaleString('default', {month: 'long'})} {date.toLocaleString('default', {year: 'numeric'})}
            </p>
            <svg onMouseDown={e => e.preventDefault()} onClick={onPlus} width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L22 16L12 26" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </section>
    )
}