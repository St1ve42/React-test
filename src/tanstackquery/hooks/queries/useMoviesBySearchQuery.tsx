import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMovieBySearch} from "../../../services/api.service.ts";
import type {DataMovieType} from "../../../models/MovieType.ts";

export const useMoviesBySearchQuery = (query: string) => {
    return useQuery({
        queryKey: [query],
        queryFn: async () => getMovieBySearch<DataMovieType>(query),
        placeholderData: keepPreviousData,
        retry: false,
    })
};