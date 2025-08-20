import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMoviesByGenre} from "../../../services/api.service.ts";
import type {DataMovieType} from "../../../models/MovieType.ts";
import type {SortType} from "../../../models/SortType.ts";

const optionItemsParams: {[key: string]: string} = {"Popularity": "popularity", "Primary release date": "primary_release_date", "Average vote": "vote_average"}
const directionItemsParams: {[key: string]: string} = {"ascending": "asc", "descending": "desc"}

export const useMoviesByGenreQuery = (id: number, page: number, sortParams?: SortType) => {
    if(sortParams && sortParams.option && sortParams.direction){
        sortParams = {option: optionItemsParams[sortParams["option"]], direction: directionItemsParams[sortParams["direction"]]}
    }
    return useQuery({
        queryKey: [id, page, sortParams],
        queryFn: async () => getMoviesByGenre<DataMovieType>(id, page, sortParams),
        placeholderData: keepPreviousData,
        retry: false
    })
};