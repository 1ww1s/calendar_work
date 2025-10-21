import { FC, useRef, useState } from "react";
import classes from './input.module.scss'

interface IProps {
    label?: string;
    value: string;
    setValue: (val: string) => void;
}

export const MyInput: FC<IProps> = ({label, value, setValue}) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [isFocus, setFocus] = useState<boolean>(false)

    const onClick = () => {
        if(containerRef.current && inputRef.current && labelRef.current){
            setFocus(true)
            labelRef.current.classList.remove(classes.active)
            inputRef.current.focus()
            containerRef.current.classList.add(classes.focus)
        }
    }

    const onBlur = () => {
        if(containerRef.current && inputRef.current && labelRef.current){
            if(value === ''){
                labelRef.current.classList.add(classes.active)
            }
            inputRef.current.blur()
            containerRef.current.classList.remove(classes.focus)
        }
    }

    return (
        <section 
            ref={containerRef}
            onBlur={onBlur} 
            onClick={onClick} 
            className={classes.container}
        >
            <span 
                ref={labelRef} 
                className={classes.label + ((value === '' && !isFocus) ? ` ${classes.active}` : '')}
            >
                {label}
            </span>
            <input ref={inputRef} value={value} onChange={e => setValue(e.target.value)} />
        </section>
    )
}