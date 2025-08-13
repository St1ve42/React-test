import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMoviesList} from "../../../services/api.service.ts";
import type {DataMovieType} from "../../../models/MovieType.ts";

export const useMoviesListQuery = (endpoint: string, pageParam: number) => {
    return useQuery({
        queryKey: [endpoint, pageParam],
        queryFn: async () => getMoviesList<DataMovieType>(endpoint, pageParam),
        placeholderData: keepPreviousData,
        retry: false
    })
};