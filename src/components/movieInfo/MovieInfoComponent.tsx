import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMovieByIdQuery} from "../../tanstackquery/hooks/queries/useMovieByIdQuery.tsx";
import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import './MovieInfoStyle.css'
import {useAppSelector} from "../../redux/hooks/useApp.ts";
import {StarsRatingComponent} from "../starsRating/StarsRatingComponent.tsx";
import {GenreBadgeComponent} from "../genreBadge/GenreBadgeComponent.tsx"
import {Progress} from "../progressBar/ProgressBarComponent.tsx";
import {useErrorBoundary} from "react-error-boundary";
import {COLOR_GENRES} from "../../utils/utils.ts";
import image_not_found from '../../assets/image_not_found.jpg'
import {STUB} from "../../utils/utils.ts";
import {useMovieImagesQuery} from "../../tanstackquery/hooks/queries/useMovieImagesQuery.tsx";
import {useMovieVideosQuery} from "../../tanstackquery/hooks/queries/useMovieVideosQuery.tsx";

export const MovieInfoComponent = () => {
    const {showBoundary, resetBoundary} = useErrorBoundary()
    const {movieId} = useParams()
    const [id, setId] = useState<number>(Number(movieId))
    const {opacity} = useAppSelector(({opacitySlice}) => opacitySlice)
    useEffect(() => {
        resetBoundary()
        setId(movieId ? Number(movieId) : 1)
    },[movieId, resetBoundary])
    const movieByIdQuery = useMovieByIdQuery(id)
    const movieImagesQuery = useMovieImagesQuery(id)
    const movieVideosQuery = useMovieVideosQuery(id)
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
        <main className="ml-10" style={{opacity: opacity}}>
            <section className="mt-5 flex gap-3">
                <div className="flex flex-col">
                    {movieByIdQuery.data?.poster_path ?
                        (<>
                            <div className="w-[300px] h-[450px]">
                                <PosterPreviewComponent movie={movieByIdQuery.data} height={450}/>
                            </div>
                        </>) : <div className="w-[300px] h-[400px]"><img src={image_not_found} alt={"image not found"}/></div>}
                    <div className="mt-6">
                        <StarsRatingComponent rating={0} isReadOnly={false}/>
                    </div>
                </div>
                <aside className="pl-5 ml-10 movie-info">
                    <div className="flex gap-5">
                        <h1 className="title mt-2">{movieByIdQuery.data ? movieByIdQuery.data.title : STUB}</h1>
                        <Progress strokeWidth={9} percentage={+(movieByIdQuery.data?.vote_average ? movieByIdQuery.data.vote_average.toPrecision(2) : 0) * 10}/>
                    </div>
                    <ul className="flex flex-col gap-5 ml-[2px] mb-6">
                        <li>{movieByIdQuery.data?.runtime ? movieByIdQuery.data.runtime : STUB} min</li>
                        <li>Original title: "{movieByIdQuery.data?.original_title ? movieByIdQuery.data.original_title : STUB}"</li>
                        <li>Year: {movieByIdQuery.data?.release_date ? movieByIdQuery.data.release_date.toString().slice(0, 4) : STUB}</li>
                        <li>Genres: {movieByIdQuery.data?.genres.length !== 0 ? movieByIdQuery.data?.genres.map((genre, index) => <GenreBadgeComponent key={index}
                                                                                                                                                       bgColor={COLOR_GENRES[genre.name][0]}
                                                                                                                                                       textColor={COLOR_GENRES[genre.name][1]}>{genre.name}</GenreBadgeComponent>) : STUB}</li>
                        <li>Country: {movieByIdQuery.data?.origin_country.length !== 0 ? movieByIdQuery.data?.origin_country.map((country, index) => <span key={index}
                                                                                                                                                           className="ml-1">{country}{index !== movieByIdQuery.data?.origin_country.length - 1 ? ',' : ''}</span>) : STUB}</li>
                        <li>Production
                            company: {movieByIdQuery.data?.production_companies.length !== 0 ? movieByIdQuery.data?.production_companies.map((company, index) => <span
                                key={index}
                                className="ml-1">{company.name}{index !== movieByIdQuery.data?.production_companies.length - 1 ? ',' : ''}</span>) : STUB}</li>
                        <li>Description: <br/>{movieByIdQuery.data?.overview ? movieByIdQuery.data.overview : STUB}</li>
                    </ul>
                </aside>
            </section>
            <section className="mt-7 mb-7 flex gap-[19.5px]">
                {movieImagesQuery.data?.backdrops.slice(0, 5).map(image => <img width={220} src={`https://image.tmdb.org/t/p/original${image.file_path}`} alt={image.file_path}/>)}
            </section>
            <iframe className="mb-10" width="1180" height="561" src={`https://www.youtube.com/embed/${movieVideosQuery.data?.results[0]?.key}`} title={`${movieVideosQuery.data?.results[0]?.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
            </iframe>
        </main>
    );
};