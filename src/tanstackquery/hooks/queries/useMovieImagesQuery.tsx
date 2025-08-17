import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMovieImages} from "../../../services/api.service.ts";
import type {DataMovieImagesType} from "../../../models/ImageInfoType.ts";

export const useMovieImagesQuery = (movieId: number) => {
    return useQuery({
        queryKey: [`${movieId} images`],
        queryFn: async () => getMovieImages<DataMovieImagesType>(movieId),
        placeholderData: keepPreviousData,
        retry: false
    })
};

