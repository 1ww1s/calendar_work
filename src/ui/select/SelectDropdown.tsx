import { FC, useState } from "react";
import classes from './select.module.scss'

interface IProps {
    items: string[];
    selected: string;
    onSelected: (selected: string) => void;
}

export const SelectDropdown: FC<IProps> = ({items, selected, onSelected}) => {

    const [open, setOpen] = useState<boolean>(false)

    const onClick = () => {
        setOpen(!open)
    }

    const onSelectedWrap = (selected: string) => {
        setOpen(false)
        onSelected(selected)
    }

    return (
        <section className={classes.container}>
            <section className={classes.selected} onClick={onClick}>
                {selected}
            </section>
            <ul className={classes.list + (open ? ` ${classes.open}` : '')}>
                {items.map(item => 
                    <li
                        key={item}
                        className={classes.item + (item === selected ? ` ${classes.itemSelected}` : '')}
                        onClick={() => onSelectedWrap(item)}
                    >
                        {item}
                    </li>
                )}
            </ul>
        </section>
    )
}