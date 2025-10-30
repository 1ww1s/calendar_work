import { FC, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { MyInput } from "../../input/MyInput";


interface IProps {
    color: string;
    setColor: (color: string) => void;
}

export const ChooseColor: FC<IProps> = ({color, setColor}) => {
  
  return (
    <>
      <HexColorPicker color={color} onChange={setColor} />
    </>
)
};