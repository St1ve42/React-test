import axios from "axios";
import type {SortType} from "../models/SortType.ts";
import type {MovieType} from "../models/MovieType.ts";
import type {ImageType} from "../models/ImageType.ts";
import type {GenreType} from "../models/GenreType.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    }
})

export async function getMoviesList<T>(endpoint: string, page: number) {
    const {data} = await axiosInstance.get(`movie/${endpoint}?language=en-US&page=${page}`);
    return data as T;
}

export async function getMovieBySearch<T>(query: string) {
    const {data} = await axiosInstance.get(`search/movie?query=${query}`);
    return data as T;
}

export async function getGenres<T>(){
    const {data}: {data: {genres: GenreType[]}} = await axiosInstance.get(`genre/movie/list?language=en`);
    return data.genres as T;
}

export async function getMoviesByGenre<T>(id: number, page: number, sortParams?: SortType) {
    const {data} = await axiosInstance.get(`discover/movie?with_genres=${id}&page=${page}&sort_by=${sortParams?.option}.${sortParams?.direction}`);
    return data as T;
}

export async function getMovieById<T>(id: number) {
    const {data} = await axiosInstance.get(`movie/${id}`);
    return data as T;
}

export async function getMovieImages<T>(id: number) {
    const {data}: {data: {backdrops: ImageType[]}} = await axiosInstance.get(`movie/${id}/images`);
    return data.backdrops as T;
}

export async function getMovieVideos<T>(id: number) {
    const {data}: {data: {results: MovieType[]}} = await axiosInstance.get(`movie/${id}/videos`);
    return data.results as T;
}

