import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMovieVideos} from "../../../services/api.service.ts";
import type {MovieVideoType} from "../../../models/VideoType.ts";

export const useMovieVideosQuery = (movieId: number) => {
    return useQuery({
        queryKey: [`${movieId} videos`],
        queryFn: async () => getMovieVideos<MovieVideoType[]>(movieId),
        placeholderData: keepPreviousData,
        retry: false
    })
};

