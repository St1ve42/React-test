import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import './MovieInfoStyle.css'
import {StarsRatingComponent} from "../starsRating/StarsRatingComponent.tsx";
import {GenreBadgeComponent} from "../genreBadge/GenreBadgeComponent.tsx"
import {Progress} from "../progressBar/ProgressBarComponent.tsx";
import {breakpoints, COLOR_GENRES, getDate, SLIDES_PER_VIEW} from "../../utils/utils.ts";
import image_not_found from '../../assets/image_not_found.jpg'
import {STUB} from "../../utils/utils.ts";
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useMovieInfo} from "./useMovieInfo.tsx";

export const MovieInfoComponent = () => {
    const {showBoundary, opacity, movieByIdQuery, movieImagesQuery, movieVideosQuery} = useMovieInfo()

    if(movieByIdQuery.isLoading || movieImagesQuery.isLoading || movieVideosQuery.isLoading) return <div>Loading...</div>

    if(movieByIdQuery.error){
        showBoundary(movieByIdQuery.error)
    }
    if(movieImagesQuery.error){
        showBoundary(movieByIdQuery.error)
    }
    if(movieVideosQuery.error){
        showBoundary(movieByIdQuery.error)
    }
    return (
        <main className="w-full" style={{opacity: opacity}}>
            <section>
                <div className="mt-2 mb-4 flex gap-3 max-[946px]:flex-col max-[946px]:items-center">
                    <div className="mt-2">
                        {movieByIdQuery.data?.poster_path ?
                            (<>
                                <div className="w-[300px] h-[450px]">
                                    <PosterPreviewComponent movie={movieByIdQuery.data} width={450}/>
                                </div>
                            </>) : <div className="w-[300px] h-[400px]"><img className="h-[400px]" width={300} src={image_not_found} alt={"image not found"}/></div>}
                    </div>
                    <aside className="pl-5 ml-10 max-[946px]:self-center">
                        <div className="flex gap-5 max-[946px]:flex-col max-[946px]:mb-5">
                            <h1 className="title mt-2">{movieByIdQuery.data ? movieByIdQuery.data.title : STUB}</h1>
                            <Progress strokeWidth={9} percentage={+(movieByIdQuery.data?.vote_average ? movieByIdQuery.data.vote_average.toPrecision(2) : 0) * 10}/>
                        </div>
                        <ul className="flex flex-col gap-5 ml-[2px] mb-6">
                            <li>{movieByIdQuery.data?.runtime ? movieByIdQuery.data.runtime : STUB} min</li>
                            <li>Original title: "{movieByIdQuery.data?.original_title ? movieByIdQuery.data.original_title : STUB}"</li>
                            <li>Release date: {movieByIdQuery.data?.release_date ? getDate(movieByIdQuery.data.release_date.toString()) : STUB}</li>
                            <li>Genres: {movieByIdQuery.data?.genres.length !== 0 ? movieByIdQuery.data?.genres.map((genre, index) => <GenreBadgeComponent key={index}
                                                                                                                                                           bgColor={COLOR_GENRES[genre.name][0]}
                                                                                                                                                           textColor={COLOR_GENRES[genre.name][1]}>{genre.name}</GenreBadgeComponent>) : STUB}</li>
                            <li>Country: {movieByIdQuery.data?.origin_country.length !== 0 ? movieByIdQuery.data?.origin_country.map((country, index) => <span key={index}
                                                                                                                                                               className="ml-1">{country}{index !== movieByIdQuery.data?.origin_country.length - 1 ? ',' : ''}</span>) : STUB}</li>
                            <li>Production
                                company: {movieByIdQuery.data?.production_companies.length !== 0 ? movieByIdQuery.data?.production_companies.map((company, index) => <span
                                    key={index}
                                    className="ml-1">{company.name}{index !== movieByIdQuery.data?.production_companies.length - 1 ? ',' : ''}</span>) : STUB}</li>
                        </ul>
                        <StarsRatingComponent isReadOnly={false}/>
                    </aside>
                </div>
                <div className="flex flex-col">
                    <p>Description: <br/>{movieByIdQuery.data?.overview ? movieByIdQuery.data.overview : STUB}</p>
                </div>
            </section>
            <section>
                <Swiper className="mt-7 mb-7" modules={[Navigation]} slidesPerView={SLIDES_PER_VIEW} navigation={true} breakpoints={breakpoints} loop={true}>
                    {movieImagesQuery.data?.slice(0, 8).map((image, index) => <SwiperSlide><img key={index} className="max-[606px]:w-full" width={250} src={`https://image.tmdb.org/t/p/original${image.file_path}`} alt={image.file_path}/></SwiperSlide>)}
                </Swiper>
            </section>
            {movieVideosQuery.data && movieVideosQuery.data?.length!==0 && <iframe className="mb-10 max-[897px]:h-[320px]" width="100%" height="561" src={`https://www.youtube.com/embed/${movieVideosQuery.data[0].key}`} title={`${movieVideosQuery.data[0].name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
            </iframe>}
        </main>
    );
};