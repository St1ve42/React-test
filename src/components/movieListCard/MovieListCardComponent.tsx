import type {FC} from "react";
import type {MovieType} from "../../models/MovieType.ts";
import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import './MoviesListCardStyle.css'
import { Link } from "react-router-dom";
import image_not_found from "../../assets/image_not_found.jpg";
import {getDate, STUB} from "../../utils/utils.ts";

type propsType = {
    movie: MovieType
}
export const MovieListCardComponent: FC<propsType> = ({movie}) => {
    const release_date: Date | string[] | string = getDate(movie.release_date)
    return (
        <Link to = {`/movie/${movie.id}`}>
            <div className="bg-black h-[404px] w-fit flex flex-col gap-1 card mb-2 m-auto">
                {movie.poster_path ? <PosterPreviewComponent movie={movie} width={200}/> : <img className="h-[306px]" src={image_not_found} alt={"image not found"}/>}
                <p className="ml-3 mb-1 max-w-[170px]">{movie.title ? movie.title : STUB}</p>
                <p className="ml-3 mb-1">{release_date}</p>
            </div>
        </Link>
    );
};
