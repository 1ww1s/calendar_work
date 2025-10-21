import { IData } from "../../model/types";


export const listChange = (list: IData[], setList: (list: IData[]) => void) => {
    return {
        setItem(item: IData){
            const copy: IData[] = JSON.parse(JSON.stringify(list))
            copy.push(item)
            setList(copy)
        },
        deleteById(id: number) {
            const targetInd = list.findIndex(l => l.id === id)
            if(targetInd >= 0) {
                const copy: IData[] = JSON.parse(JSON.stringify(list))
                copy.splice(targetInd, 1)
                setList(copy)
            }
        }
    }
}