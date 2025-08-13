import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMovieDetailsQuery} from "../../tanstackquery/hooks/queries/useMovieDetailsQuery.tsx";
import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import './MovieInfoStyle.css'
import {useAppSelector} from "../../redux/hooks/useApp.ts";
import {StarsRatingComponent} from "../starsRating/StarsRatingComponent.tsx";
import {GenreBadgeComponent} from "../genreBadge/GenreBadgeComponent.tsx"
import {Progress} from "../progressBar/ProgressBarComponent.tsx";
import {useErrorBoundary} from "react-error-boundary";
import {COLOR_GENRES} from "../../utils/utils.ts";

export const MovieInfoComponent = () => {
    const {showBoundary, resetBoundary} = useErrorBoundary()
    const {movieId} = useParams()
    const [id, setId] = useState<number>(Number(movieId))
    const {opacity} = useAppSelector(({opacitySlice}) => opacitySlice)
    useEffect(() => {
        resetBoundary()
        setId(movieId ? Number(movieId) : 1)
    },[movieId, resetBoundary])
    const query = useMovieDetailsQuery(id)
    if(query.isLoading) return <div>Loading...</div>
    if(query.error){
        showBoundary(query.error)
    }

    return (
        <main className="ml-10" style={{opacity: opacity}}>
            <section className="mt-5 flex gap-3">
                <div className="flex flex-col">
                    {query.data?.poster_path &&
                        (<>
                            <div className="w-[300px] h-[450px]">
                                <PosterPreviewComponent movie={query.data}/>
                            </div>
                            <div className="mt-6">
                                <StarsRatingComponent rating={0} isReadOnly={false}/>
                            </div>
                        </>)}
                </div>
                <section className="pl-5 ml-10 movie-info">
                    <div className="flex gap-5">
                        <h1 className="title mt-2">{query.data?.title}</h1>
                        <Progress strokeWidth={9} percentage={+(query.data?.vote_average ? query.data.vote_average.toPrecision(2) : 0)*10}/>
                    </div>
                    <ul className="flex flex-col gap-5 ml-[2px] mb-6">
                        <li>{query.data?.runtime} min</li>
                        <li>Original title: "{query.data?.original_title}"</li>
                        <li>Year: {query.data?.release_date.toString().slice(0,4)}</li>
                        <li>Genres: {query.data?.genres.map((genre, index) => <GenreBadgeComponent key = {index} bgColor={COLOR_GENRES[genre.name][0]} textColor={COLOR_GENRES[genre.name][1]}>{genre.name}</GenreBadgeComponent>)}</li>
                        <li>Country: {query.data?.origin_country.map((country, index)=> <span key={index} className="ml-1">{country}{index !== query.data?.origin_country.length - 1 ? ',' : ''}</span>)}</li>
                        <li>Production company: {query.data?.production_companies.map((company, index)=> <span key={index} className="ml-1">{company.name}{index !== query.data?.production_companies.length - 1 ? ',' : ''}</span>)}</li>
                        <li>Description: <br/>{`${query.data?.overview}`}</li>
                    </ul>
                </section>
            </section>
        </main>
    );
};