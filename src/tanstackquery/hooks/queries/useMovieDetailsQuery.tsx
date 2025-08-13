import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMovieById} from "../../../services/api.service.ts";
import type {MovieDetailsType} from "../../../models/MovieDetailsType.ts";

export const useMovieDetailsQuery = (movieId: number) => {
    return useQuery({
        queryKey: [movieId],
        queryFn: async () => getMovieById<MovieDetailsType>(movieId),
        placeholderData: keepPreviousData,
        retry: false
    })
};

