import type {MovieType} from "../../models/MovieType.ts";
import type {FC} from "react";
import type {MovieDetailsType} from "../../models/MovieDetailsType.ts";

type PropsType = {
    movie: MovieType | MovieDetailsType,
    width?: number
}

export const PosterPreviewComponent: FC<PropsType> = ({movie, width}) => {
    return (
        <img width={width} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
    );
};