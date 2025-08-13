import type {FC} from "react";
import type {MovieType} from "../../models/MovieType.ts";
import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import './MoviesListCardStyle.css'
import { Link } from "react-router-dom";

type propsType = {
    movie: MovieType
}
export const MoviesListCardComponent: FC<propsType> = ({movie}) => {
    if(!movie.poster_path){
        return <></>
    }

    return (
        <Link to = {`/movie/${movie.id}`}>
            <div className=" h-[450px] bg-black flex flex-col gap-1 card">
                <PosterPreviewComponent movie={movie}/>
                <p className="ml-3 mb-1">{movie.title}</p>
                <p className="ml-3 mb-1">{movie.release_date}</p>
            </div>
        </Link>
    );
};