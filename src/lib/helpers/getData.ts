import { IData } from "../../model/types";

export const getData = (list: IData[], dateStr: string) => {
        const calendar_work: any = JSON.parse(localStorage.getItem('calendar_work') || "null")
        let data: IData | null = null;
        if(calendar_work){
            const id: number = calendar_work[dateStr] as number
            const target = list.find(l => l.id === id)
            if(target){
                data = target
            }
        }
        return data
    }