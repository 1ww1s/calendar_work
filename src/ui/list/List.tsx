import { FC, MouseEvent, useState } from "react";
import { IData } from "../../model/types";
import classes from './list.module.scss'
import img from '../../lib/assets/delete.png'
import { listChange } from "../../lib/helpers/listChange";

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
        <>
            <h3>Список пользователей</h3>
            <ul className={classes.list}>
                {list.map(l => 
                    <li 
                        className={classes.item + (selectedId === l.id ? ` ${classes.selected}` :'')} 
                        key={l.name}
                        onClick={() => setSelectedId(l.id)}
                    >
                        {l.name} <span style={{backgroundColor: l.color}} className={classes.color}></span>
                        <img onClick={(e) => onOpen(e, l.id)} src={img} />
                    </li>
                )}
            </ul>
            {
                open
                    &&
                <section className={classes.modal}>
                    <section className={classes.content}>
                        <section className={classes.title}>Точно хотите удалить?</section>
                        <section className={classes.buttons}>
                            <button onClick={() => setOpen(false)} className={classes.no}>Нет</button>
                            <button onClick={onDelete} className={classes.yes}>Да</button>
                        </section>
                    </section>
                </section>
            }
        </>
    )
} 