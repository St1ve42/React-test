import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMovieImages} from "../../../services/api.service.ts";
import type {ImageType} from "../../../models/ImageType.ts";

export const useMovieImagesQuery = (movieId: number) => {
    return useQuery({
        queryKey: [`${movieId} images`],
        queryFn: async () => getMovieImages<ImageType[]>(movieId),
        placeholderData: keepPreviousData,
        retry: false
    })
};

