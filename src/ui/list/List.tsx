import { FC, MouseEvent, useState } from "react";
import { IData } from "../../model/types";
import classes from './list.module.scss'
import deleteImg from '../../lib/assets/delete.png'
import { listChange } from "../../lib/helpers/listChange";
import { Hint } from "../hint";
import { Modal } from "../modal";

interface IProps {
    list: IData[];
    setList: (list: IData[]) => void;
    selectedId: number | null;
    setSelectedId: (selected: number) => void;
}

export const List: FC<IProps> = ({list, setList, selectedId, setSelectedId}) => {

    const [open, setOpen] = useState<boolean>(false)

    const [deleteId, setDeleteId] = useState<number | null>(null)

    const {deleteById} = listChange(list, setList)

    const onDelete = () => {
        if(deleteId){
            const calendar_work: any = JSON.parse(localStorage.getItem('calendar_work') || "null")
            if(calendar_work){
                for (let key in calendar_work){
                    console.log(calendar_work[key])
                    if(+calendar_work[key] === deleteId){
                        delete calendar_work[key]
                    }
                }
            }
            deleteById(deleteId)
            localStorage.setItem('calendar_work', JSON.stringify(calendar_work))
            setOpen(false)
        }
    }

    const onOpen = (e: MouseEvent, id: number) => {
        e.stopPropagation()
        setDeleteId(id)
        setOpen(true)
    }

    return (
        <section className={classes.wrapper}>
            <h3>Список пользователей</h3>
            <ul className={classes.list}>
                {list.map(l => 
                    <li 
                        className={classes.item + (selectedId === l.id ? ` ${classes.selected}` :'')} 
                        key={l.name}
                        onClick={() => setSelectedId(l.id)}
                    >
                        {l.name} <Hint label={l.color}><span style={{backgroundColor: l.color}} className={classes.color} /></Hint>
                        <img onClick={(e) => onOpen(e, l.id)} src={deleteImg} />
                    </li>
                )}
            </ul>
            {
                open
                    &&
                <Modal 
                    open={open}
                    setOpen={setOpen}
                    question="Точно хотите удалить?"
                    onDelete={onDelete}
                />
            }
        </section>
    )
} 