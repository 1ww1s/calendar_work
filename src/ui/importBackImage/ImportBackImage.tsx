import { ChangeEvent, FC, useEffect, useState } from "react";
import classes from './importBackImage.module.scss'



export const ImportBackImage: FC = () => {

    const [error, setError] = useState<string>('')
    const [url, setUrl] = useState<string>('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(files){
            const file = files[0]
            if(file){
                const read = new FileReader()
                read.readAsArrayBuffer(file)
                read.onload = () => {
                    try{
                        const result: ArrayBuffer = read.result as ArrayBuffer
                        if(url){
                            URL.revokeObjectURL(url)
                        }
                        const newUrl = URL.createObjectURL(new Blob([result]))
                        window.document.documentElement.style.backgroundImage = `url('${newUrl}')`
                        setUrl(newUrl)
                    }
                    catch(e){
                        setError('Не правильный формат файла')
                    }
                }
            }
        }
    }

    useEffect(() => {

        return () => {
            if(url){
                URL.revokeObjectURL(url)
            }
        }
    }, [])

    return (
        <label className={classes.container}>
            <input onChange={onChange} type="file" accept=".png, .jpg, .jpeg" />
            Фотка на фон
            {error && <span className={classes.error}>{error}</span>}
       </label>
    )
}