import { FC, MouseEvent, PropsWithChildren, use, useState } from "react";
import classes from './hint.module.scss'

interface IProps {
    label: string;
}

export const Hint: FC<IProps & PropsWithChildren> = ({label, children}) => {

    const [open, setOpen] = useState<boolean>(false)

    const onEnter = () => {
        setOpen(true)
    }

    const onLeave = () => {
        setOpen(false)
    }   

    return (
        <section 
            onMouseEnter={onEnter} 
            onMouseLeave={onLeave}
            onClick={e => e.stopPropagation()} 
            className={classes.container}
        >
            <section 
                className={classes.target}
            >
                {children}
            </section>
            {
                open
                    &&
                <section className={classes.hint}>
                    {label}
                </section>
            }
        </section>
    )
}