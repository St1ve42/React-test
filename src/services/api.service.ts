import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWY4YTI2ZTNjYzlmYjY1MDUxYWZhNDI2MWUxNmRlZCIsIm5iZiI6MTc1Mzc4ODA4NS4zMjcwMDAxLCJzdWIiOiI2ODg4YWViNWI3NTZhMmY1N2Q1MmI5MjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nm3NzTS6NaGnPdbe8pPaiIBdOfTTQBMhCghSj-PpjgQ'
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
    const {data} = await axiosInstance.get(`genre/movie/list?language=en`);
    return data.genres as T;
}

export async function getMoviesByGenre<T>(id: number, page: number) {
    const {data} = await axiosInstance.get(`discover/movie?with_genres=${id}&page=${page}`);
    return data as T;
}

export async function getMovieById<T>(id: number) {
    const {data} = await axiosInstance.get(`movie/${id}`);
    return data as T;
}



