import * as React from "react";
import type {FC} from "react";

type PropsType = {
    bgColor: string,
    textColor: string,
    children?: React.ReactNode,
}

export const GenreBadgeComponent: FC<PropsType> = ({bgColor, textColor, children}) => {
    return (
        <span className={`rounded-sm font-bold leading-5 mr-3 align-baseline text-center size-fit p-[2.5px]`} style = {{background: bgColor, color: textColor}}>
            {children}
        </span>
    );
};