import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import {Progress} from "../progressBar/ProgressBarComponent.tsx";
import type {MovieType} from "../../models/MovieType.ts";
import type {FC} from "react";
import {STUB} from "../../utils/utils.ts";
import image_not_found from "../../assets/image_not_found.jpg"

type PropsType = {
    movie: MovieType
}

export const SearchedMoviesComponent: FC<PropsType> = ({movie}) => {
    return (
        <div className="mb-11 flex">
            <div className="w-[40%] h-full">
                {movie.poster_path ? <PosterPreviewComponent movie={movie}/> : <img src={image_not_found} alt={"image not found"}/>}
            </div>
            <div className="w-[60%] ml-2 flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <p>"{movie.title ? movie.title : STUB}"</p>
                    <p>{movie.overview ? movie.overview.slice(0,111) + '...' : STUB}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>{movie.release_date ? movie.release_date.toString().slice(0, 4) : STUB}</p>
                    <Progress strokeWidth={9} percentage={+(movie.vote_average ? movie.vote_average.toPrecision(2) : 0)*10}/>
                </div>
            </div>
        </div>
    );
};