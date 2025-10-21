import { FC, useState } from "react";
import { IData } from "../../model/types";
import classes from './addList.module.scss'
import { listChange } from "../../lib/helpers/listChange";
import { MyInput } from "../input/MyInput";
import { ChooseColor } from "../calendar/chooseColor/ChooseColor";
import { MyButton } from "../button";

interface IProps {
    list: IData[];
    setList: (list: IData[]) => void;
}

export const AddList: FC<IProps> = ({list, setList}) => {

    const {setItem} = listChange(list, setList)

    const [name, setName] = useState<string>('')
    const [color, setColor] = useState("#aabbcc");
    const [error, setError] = useState<string>('')

    const check = () => {
        if(!name){
            setError('Заполните ФИО')
            return
        }
        const repeatColor = list.find(l => l.color === color)
        if(repeatColor){
            setError('Такой цвет уже был')
            return
        }
        setItem({id: Date.now(), name, color})
        setName('')
        setColor("#aabbcc")
    }

    const setVal = (val: string) => {
        setName(val)
        setError('')
    }

    return (
        <section className={classes.container}>
            <h3>Добавить пользователя</h3>
            <section className={classes.data}>
                <MyInput label="ФИО" value={name} setValue={setVal} />
                <span className={classes.color} style={{backgroundColor: color}}></span>
                <section className={classes.choose}>
                    <ChooseColor color={color} setColor={setColor} />
                </section>
            </section>
            <section className={classes.button}>
                <MyButton error={error} onClick={check}>
                    Добавить
                </MyButton>
            </section>
        </section>
    )
} 