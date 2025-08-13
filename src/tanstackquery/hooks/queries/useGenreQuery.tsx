import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getGenres} from "../../../services/api.service.ts";
import type {GenresType} from "../../../models/MovieDetailsType.ts";

export const useGenreQuery = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: getGenres<GenresType[]>,
        placeholderData: keepPreviousData,
        retry: false
    })
}