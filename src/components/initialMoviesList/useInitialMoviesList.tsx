import {useErrorBoundary} from "react-error-boundary";
import {useAppSelector} from "../../redux/hooks/useApp.ts";
import {useMovieListsQuery} from "../../tanstackquery/hooks/queries/useMovieListsQuery.tsx";
import type {UseQueryResult} from "@tanstack/react-query";
import type {DataMovieType} from "../../models/MovieType.ts";

type moviesQueryType = {
    [key: string]:  UseQueryResult<DataMovieType, Error>
}

export const useInitialMoviesList = () => {
    const {showBoundary} = useErrorBoundary()

    const {opacity} = useAppSelector(({opacitySlice}) => opacitySlice)
    const moviesQuery: moviesQueryType = {
        'now_playing': useMovieListsQuery('now_playing', 1),
        'popular': useMovieListsQuery('popular', 1),
        'top_rated': useMovieListsQuery('top_rated', 1),
        'upcoming': useMovieListsQuery('upcoming', 1),
    }
    return {showBoundary, opacity, moviesQuery}
};