import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMovieVideos} from "../../../services/api.service.ts";
import type {DataMovieVideoType} from "../../../models/VideoType.ts";

export const useMovieVideosQuery = (movieId: number) => {
    return useQuery({
        queryKey: [`${movieId} videos`],
        queryFn: async () => getMovieVideos<DataMovieVideoType>(movieId),
        placeholderData: keepPreviousData,
        retry: false
    })
};

