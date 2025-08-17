import type {FC} from "react";
import type {MovieType} from "../../models/MovieType.ts";
import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import './MoviesListCardStyle.css'
import { Link } from "react-router-dom";
import image_not_found from "../../assets/image_not_found.jpg";
import {STUB} from "../../utils/utils.ts";

type propsType = {
    movie: MovieType
}
export const MoviesListCardComponent: FC<propsType> = ({movie}) => {
    let release_date: Date | string[] | string = ''
    if(movie.release_date){
        release_date = new Date(movie.release_date).toDateString().split(" ")
        release_date[release_date.length-2] = release_date[release_date.length-2] + ','
        release_date.shift()
        release_date = release_date.join(" ")
    }
    else{
        release_date = STUB
    }
    return (
        <Link to = {`/movie/${movie.id}`}>
            <div className="bg-black min-h-[404px] w-fit flex flex-col gap-1 card mb-2 m-auto">
                {movie.poster_path ? <PosterPreviewComponent movie={movie} height={300}/> : <img height={200} src={image_not_found} alt={"image not found"}/>}
                <p className="ml-3 mb-1 w-[200px]">{movie.title ? movie.title : STUB}</p>
                <p className="ml-3 mb-1">{release_date}</p>
            </div>
        </Link>
    );
};