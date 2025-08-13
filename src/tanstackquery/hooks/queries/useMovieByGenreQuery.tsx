import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMoviesByGenre} from "../../../services/api.service.ts";
import type {DataMovieType} from "../../../models/MovieType.ts";

export const useMovieByGenreQuery = (id: number, page: number) => {
    return useQuery({
        queryKey: [id, page],
        queryFn: async () => getMoviesByGenre<DataMovieType>(id, page),
        placeholderData: keepPreviousData,
        retry: false
    })
};