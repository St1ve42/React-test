import {useAppSelector} from "../../redux/hooks/useApp.ts";
import {useMoviesListQuery} from "../../tanstackquery/hooks/queries/useMoviesListQuery.tsx";
import {MoviesListCardComponent} from "../moviesListCard/MoviesListCardComponent.tsx";
import type {UseQueryResult} from "@tanstack/react-query";
import type {DataMovieType} from "../../models/MovieType.ts";
import './InitialMoviesListStyle.css'
import {useErrorBoundary} from "react-error-boundary";
import {Navigation} from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import {MainMoviesListComponent} from "../mainMoviesList/MainMoviesListComponent.tsx";

type moviesQueryType = {
    [key: string]:  UseQueryResult<DataMovieType, Error>
}

export const InitialMoviesListComponent = () => {
    const {showBoundary} = useErrorBoundary()

    const {opacity} = useAppSelector(({opacitySlice}) => opacitySlice)

    const moviesQuery: moviesQueryType = {
        'now_playing': useMoviesListQuery('now_playing', 1),
        'popular': useMoviesListQuery('popular', 1),
        'top_rated': useMoviesListQuery('top_rated', 1),
        'upcoming': useMoviesListQuery('upcoming', 1),
    }

    if(Object.keys(moviesQuery).some(key => moviesQuery[key].isLoading)){
        return <div>Loading...</div>
    }

    const foundErrorElementKey: string | undefined = Object.keys(moviesQuery).find(key => moviesQuery[key].isError)
    if(foundErrorElementKey){
        showBoundary(moviesQuery[foundErrorElementKey].error)
    }

    return (
        <main className="h-[80%] flex flex-col justify-between mt-5 gap-10 mb-10" style={{opacity: opacity}}>
            <section>
                <Swiper modules={[Navigation]} slidesPerView={1} navigation={true}>
                    {moviesQuery['now_playing'].data && moviesQuery['now_playing'].data?.results.map(movie => <SwiperSlide><MainMoviesListComponent key={movie.id} mainMovie={movie}/></SwiperSlide>)}
                </Swiper>

            </section>
            <section>
                <h2 className="initial-movie-title">Now playing</h2>
                <Swiper modules={[Navigation]} slidesPerView={5} navigation={true}>
                    {moviesQuery['now_playing'].data && moviesQuery['now_playing'].data?.results.map(movie => <SwiperSlide><MoviesListCardComponent key={movie.id} movie={movie}/></SwiperSlide>)}
                </Swiper>
            </section>
            <section>
                <h2 className="initial-movie-title">Popular</h2>
                <Swiper modules={[Navigation]} slidesPerView={5} navigation={true}>
                    {moviesQuery['popular'].data?.results.map(movie => <SwiperSlide><MoviesListCardComponent key={movie.id} movie={movie}/></SwiperSlide>)}
                </Swiper>
            </section>
            <section>
                <h2 className="initial-movie-title">Top rated</h2>
                <Swiper modules={[Navigation]} slidesPerView={5} navigation={true}>
                    {moviesQuery['top_rated'].data?.results.map(movie => <SwiperSlide><MoviesListCardComponent key={movie.id} movie={movie}/></SwiperSlide>)}
                </Swiper>
            </section>
            <section>
                <h2 className="initial-movie-title">Upcoming</h2>
                <Swiper modules={[Navigation]} slidesPerView={5} navigation={true}>
                    {moviesQuery['upcoming'].data?.results.map(movie => <SwiperSlide><MoviesListCardComponent key={movie.id} movie={movie}/></SwiperSlide>)}
                </Swiper>
            </section>
        </main>
    );
};