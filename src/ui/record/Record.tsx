import { FC, useEffect, useState } from "react";
import classes from './record.module.scss'
import { IData, IRecord } from "../../model/types";
import { MyButton } from "../button";
import { MyInputSimple } from "../inputSimple";
import { SelectDropdown } from "../select";
import deleteImg from '../../lib/assets/delete.png'
import { Modal } from "../modal";

interface IProps {
    list: IData[];
}

export const Record: FC<IProps> = ({list}) => {

    const [records, setRecords] = useState<IRecord[]>(JSON.parse(localStorage.getItem('records') || '[]'))
    const [open, setOpen] = useState<boolean>(false)
    const [selectedDeleteInd, setSelectedDelete] = useState<number | null>(null)

    useEffect(() => {
        localStorage.setItem('records', JSON.stringify(records))
    }, [records])

    const onDelete = () => {
        if(selectedDeleteInd !== null){
            const copy: IRecord[] = JSON.parse(JSON.stringify(records))
            copy.splice(selectedDeleteInd, 1)
            setRecords(copy)
            setOpen(false)
        }
    }

    const onOpen = (ind: number) => {
        setOpen(true)
        setSelectedDelete(ind)
    }

    const setName = (ind: number) => {
        return (name: string) => {
            const copy: IRecord[] = JSON.parse(JSON.stringify(records))
            copy[ind].name = name;
            setRecords(copy)
        }
    }

    const setSample = (ind: number) => {
        return (sample: string) => {
            const copy: IRecord[] = JSON.parse(JSON.stringify(records))
            copy[ind].sample = sample;
            setRecords(copy)
        }
    }

    const setComment = (ind: number) => {
        return (comment: string) => {
            const copy: IRecord[] = JSON.parse(JSON.stringify(records))
            copy[ind].comment = comment;
            setRecords(copy)
        }
    }

    const setTime = (ind: number) => {
        return (time: string) => {
            const copy: IRecord[] = JSON.parse(JSON.stringify(records))
            copy[ind].time = time;
            setRecords(copy)
        }
    }

    const addRecord = () => {
        setRecords(records => [...records, {id: String(Date.now()), name: '', sample: '', comment: '', time: ''}])
    }

    return (
        <section className={classes.container}>
            <section className={classes.title}>
                Запись на измерения
            </section>
            <ul className={classes.list}>
                <li className={classes.itemHeader}>
                    <section className={classes.input}>
                        Имя
                    </section>
                    <section className={classes.input}>
                        Образец
                    </section>
                    <section className={classes.input}>
                        Длительность
                    </section>
                    <section className={classes.input + ` ${classes.delete}`}>
                        Комментарий
                    </section>
                </li>
                {records.map((record, ind) => 
                    <li
                        key={ind} 
                        className={classes.item}
                    >
                        <section className={classes.input}>
                            <SelectDropdown 
                                items={list.map(l => l.name)}
                                selected={record.name}
                                onSelected={setName(ind)}
                            />
                        </section>
                        <section className={classes.input}>
                            <MyInputSimple value={record.sample} setValue={setSample(ind)} />
                        </section>
                        <section className={classes.input}>
                            <MyInputSimple value={record.time} setValue={setTime(ind)} />
                        </section>
                        <section className={classes.input + ` ${classes.delete}`}>
                            <MyInputSimple value={record.comment} setValue={setComment(ind)} />
                            <img onClick={() => onOpen(ind)} src={deleteImg} />
                        </section>
                    </li>
                )}
            </ul>
            <MyButton onClick={addRecord}>
                Добавить
            </MyButton>
            <Modal 
                question="Точно хотите удалить запись?"
                setOpen={setOpen}
                open={open}
                onDelete={onDelete}
            />
        </section>
    )
}