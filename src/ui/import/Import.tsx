import { ChangeEvent, FC, useState } from "react";
import classes from './import.module.scss'
import { IData } from "../../model/types";

interface IResult {
    calendar_work: {[key: string]: IData}
    list: IData[];
}

interface IProps {
    setList: (list: IData[]) => void;
}

export const Import: FC<IProps> = ({setList}) => {
    
    const [error, setError] = useState<string>('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(files){
            const file = files[0]
            const read = new FileReader()
            read.readAsText(file)
            read.onload = () => {
                try{
                    const result: string = read.result as string;
                    const resultData: IResult = JSON.parse(result)
                    localStorage.setItem('calendar_work', JSON.stringify(resultData.calendar_work))
                    localStorage.setItem('list', JSON.stringify(resultData.list))
                    setList(resultData.list)
                }
                catch(e){
                    setError('Не правильный формат файла')
                }
            }
        }

    }

    return (
        <section className={classes.container}>
            <input onChange={onChange} type="file" accept=".txt" />
            {error && <span className={classes.error}>{error}</span>}
        </section>
    )
} 