import * as React from "react";

export const PreviousSelection = (startPageOfSelection: number, setStartPageOfSelection: React.Dispatch<React.SetStateAction<number>>) => {
    if(startPageOfSelection > 2){
        setStartPageOfSelection(startPageOfSelection - 1)
    }
}

export const NextSelection = (startPageOfSelection: number, setStartPageOfSelection: React.Dispatch<React.SetStateAction<number>>) => {
    if(startPageOfSelection <= 498){
        setStartPageOfSelection(startPageOfSelection + 1)
    }
}

