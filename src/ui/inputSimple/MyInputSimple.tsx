import { FC } from "react";
import classes from './myInputSimple.module.scss'

interface IProps {
    value: string;
    setValue: (val: string) => void;
}

export const MyInputSimple: FC<IProps> = ({value, setValue}) => {

    return (
        <input 
            className={classes.container}
            value={value} 
            onChange={e => setValue(e.target.value)} 
        />
    )
}