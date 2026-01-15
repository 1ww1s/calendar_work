import { FC, useState } from "react";
import { HexColorPicker } from "react-colorful";


interface IProps {
    color: string;
    setColor: (color: string) => void;
}

export const ChooseColor: FC<IProps> = ({color, setColor}) => {
  
  return (
    <>
      <HexColorPicker style={{width: '210px', height: '210px'}} color={color} onChange={setColor} />
    </>
)
};