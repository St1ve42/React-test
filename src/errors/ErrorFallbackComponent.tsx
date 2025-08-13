import type {FC} from "react";
import {Link} from "react-router-dom";

type PropsType = {
    error: Error,
    resetErrorBoundary: () => void,
}

export const ErrorFallbackComponent: FC<PropsType> = ({resetErrorBoundary}) => {
    return (
        <div className="w-full h-[550px] flex flex-col justify-center items-center gap-3">
            <h1 className="text-2xl">404</h1>
            <p>Sorry, but page couldn't be found. You may go home and check other links</p>
            <Link to = {'/'} onClick={resetErrorBoundary}>Go Home</Link>
        </div>
    );
};