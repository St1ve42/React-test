import type {FC} from "react";
import type {SetURLSearchParams} from "react-router-dom";

type PropsType = {
    startPageOfSelection: number,
    pageSelectionOutput: number[],
    total_pages: number,
    handleSelection: {handlePreviousSelection: () => void, handleNextSelection: () => void},
    setQuery: SetURLSearchParams
}

export const PageScrollingComponent: FC<PropsType> = ({startPageOfSelection, pageSelectionOutput, total_pages, handleSelection, setQuery}) => {
    total_pages = total_pages <= 500 ? total_pages : 500
    console.log(startPageOfSelection)
    if(startPageOfSelection <= 1){
            return (<div className="flex justify-center gap-5">
                {pageSelectionOutput.map(value => {
                    return (
                        <button onClick={() => setQuery({page: value.toString()})} key={value}>{value}</button>
                    )
                })}
                <p>...</p>
                <button onClick={() => setQuery({page: total_pages.toString()})}>{total_pages}</button>
                <button onClick={handleSelection.handleNextSelection}> &gt; </button>
            </div>)
        }
    else if(startPageOfSelection >= 2 && startPageOfSelection <= total_pages - 3){
            return (<div className="flex justify-center gap-5">
                <button onClick={handleSelection.handlePreviousSelection}> &lt; </button>
                <button onClick={() => setQuery({page: '1'})}>1</button>
                <p>...</p>
                {pageSelectionOutput.map(value => {
                    return (
                        <button onClick={() => setQuery({page: value.toString()})} key={value}>{value}</button>
                    )
                })}
                <p>...</p>
                <button onClick={() => setQuery({page: total_pages.toString()})}>{total_pages}</button>
                <button onClick={handleSelection.handleNextSelection}> &gt; </button>
            </div>)
        }
    return (<div className="flex justify-center gap-5">
            <button onClick={handleSelection.handlePreviousSelection}> &lt; </button>
            <button onClick={() => setQuery({page: '1'})}>1</button>
            <p>...</p>
            {pageSelectionOutput.map(value => {
                return (
                    <button onClick={() => setQuery({page: value.toString()})} key={value}>{value}</button>
                )
            })}
        </div>)
};