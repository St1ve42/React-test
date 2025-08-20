import {useErrorBoundary} from "react-error-boundary";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../redux/hooks/useApp.ts";
import {useMovieByIdQuery} from "../../tanstackquery/hooks/queries/useMovieByIdQuery.tsx";
import {useMovieImagesQuery} from "../../tanstackquery/hooks/queries/useMovieImagesQuery.tsx";
import {useMovieVideosQuery} from "../../tanstackquery/hooks/queries/useMovieVideosQuery.tsx";

export const useMovieInfo = () => {
    const {showBoundary, resetBoundary} = useErrorBoundary()
    const {movieId} = useParams()
    const [id, setId] = useState<number>(Number(movieId))
    const {opacity} = useAppSelector(({transitionalSlice}) => transitionalSlice)
    useEffect(() => {
        resetBoundary()
        setId(movieId ? Number(movieId) : 1)
    },[movieId, resetBoundary])
    const movieByIdQuery = useMovieByIdQuery(id)
    const movieImagesQuery = useMovieImagesQuery(id)
    const movieVideosQuery = useMovieVideosQuery(id)
    return {showBoundary, opacity, movieByIdQuery, movieImagesQuery, movieVideosQuery}
};