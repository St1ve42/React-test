import {MovieListCardComponent} from "../movieListCard/MovieListCardComponent.tsx";
import './InitialMoviesListStyle.css'
import {Navigation} from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import {MainMoviesListComponent} from "../mainMoviesList/MainMoviesListComponent.tsx";
import {useInitialMoviesList} from "./useInitialMoviesList.tsx";
import {breakpoints, SLIDES_PER_VIEW} from "../../utils/utils.ts";

export const InitialMoviesListComponent = () => {
    const {showBoundary, opacity, moviesQuery} = useInitialMoviesList()
    const foundErrorElementKey: string | undefined = Object.keys(moviesQuery).find(key => moviesQuery[key].isError)


    if(Object.keys(moviesQuery).some(key => moviesQuery[key].isLoading)){
        return <div>Loading...</div>
    }

    if(foundErrorElementKey){
        showBoundary(moviesQuery[foundErrorElementKey].error)
    }

    return (
        <main className="h-[80%] flex flex-col justify-between mt-5 gap-10 mb-10" style={{opacity: opacity}}>
            <section>
                <Swiper modules={[Navigation]} slidesPerView={1} navigation={true} loop={true}>
                    {moviesQuery['now_playing'].data && moviesQuery['now_playing'].data?.results.map(movie => <SwiperSlide><MainMoviesListComponent key={movie.id} mainMovie={movie}/></SwiperSlide>)}
                </Swiper>

            </section>
            <section>
                <h2 className="initial-movie-title">Now playing</h2>
                <Swiper modules={[Navigation]} slidesPerView={SLIDES_PER_VIEW} navigation={true} breakpoints={breakpoints} loop={true}>
                    {moviesQuery['now_playing'].data && moviesQuery['now_playing'].data?.results.map(movie => <SwiperSlide><MovieListCardComponent key={movie.id} movie={movie}/></SwiperSlide>)}
                </Swiper>
            </section>
            <section>
                <h2 className="initial-movie-title">Popular</h2>
                <Swiper modules={[Navigation]} slidesPerView={SLIDES_PER_VIEW} navigation={true} breakpoints={breakpoints} loop={true}>
                    {moviesQuery['popular'].data?.results.map(movie => <SwiperSlide><MovieListCardComponent key={movie.id} movie={movie}/></SwiperSlide>)}
                </Swiper>
            </section>
            <section>
                <h2 className="initial-movie-title">Top rated</h2>
                <Swiper modules={[Navigation]} slidesPerView={SLIDES_PER_VIEW} navigation={true} breakpoints={breakpoints} loop={true}>
                    {moviesQuery['top_rated'].data?.results.map(movie => <SwiperSlide><MovieListCardComponent key={movie.id} movie={movie}/></SwiperSlide>)}
                </Swiper>
            </section>
            <section>
                <h2 className="initial-movie-title">Upcoming</h2>
                <Swiper modules={[Navigation]} slidesPerView={SLIDES_PER_VIEW} navigation={true} breakpoints={breakpoints} loop={true}>
                    {moviesQuery['upcoming'].data?.results.map(movie => <SwiperSlide><MovieListCardComponent key={movie.id} movie={movie}/></SwiperSlide>)}
                </Swiper>
            </section>
        </main>
    );
};