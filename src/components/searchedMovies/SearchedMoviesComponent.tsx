import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import {Progress} from "../progressBar/ProgressBarComponent.tsx";
import type {MovieType} from "../../models/MovieType.ts";
import type {FC} from "react";

type PropsType = {
    movie: MovieType
}

export const SearchedMoviesComponent: FC<PropsType> = ({movie}) => {
    return (
        <div className="mb-11 flex">
            <div className="w-[40%] h-full">
                <PosterPreviewComponent movie={movie}/>
            </div>
            <div className="w-[60%] ml-2 flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <p>"{movie.title}"</p>
                    <p>{movie.overview.slice(0,111)}...</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>{movie.release_date.toString().slice(0, 4)}</p>
                    <Progress strokeWidth={9} percentage={+(movie.vote_average.toPrecision(2))*10}/>
                </div>
            </div>
        </div>
    );
};