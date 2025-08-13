import {useParams, useSearchParams} from "react-router-dom";
import {useGenreQuery} from "../../tanstackquery/hooks/queries/useGenreQuery.tsx";
import type {UseQueryResult} from "@tanstack/react-query";
import type {DataMovieType} from "../../models/MovieType.ts";
import {useEffect, useMemo, useState} from "react";
import {MoviesListCardComponent} from "../moviesListCard/MoviesListCardComponent.tsx";
import {useAppSelector} from "../../redux/hooks/useApp.ts";
import {useMovieByGenreQuery} from "../../tanstackquery/hooks/queries/useMovieByGenreQuery.tsx";
import './MoviesListStyle.css'
import {NextSelection, PreviousSelection} from "../../utils/handlers.tsx";
import {pageSelection} from "../../utils/utils.ts";
import {PageScrollingComponent} from "../pageScrolling/PageScrollingComponent.tsx";
import {useErrorBoundary} from "react-error-boundary";

type MoviesQueryType = UseQueryResult<DataMovieType, Error>
type GenreIdObjType = {
    [key: number]: string
} | undefined

export const MoviesListComponent = () => {
    const {showBoundary} = useErrorBoundary()
    const {genreId} = useParams()
    const [query, setQuery] = useSearchParams({page: ''})
    const pageString = query.get("page")
    if(pageString && pageString === "1"){
        setQuery({})
    }
    const page = pageString ? Number(pageString) : 1

    const [cursorGenre, setCursorGenre] = useState<string>(genreId ? genreId : '33')
    const moviesQuery: MoviesQueryType = useMovieByGenreQuery(Number(cursorGenre), page)

    const [startPageOfSelection, setStartPageOfSelection] = useState(1)
    const pageSelectionOutput: number[] = useMemo(() => pageSelection(startPageOfSelection), [startPageOfSelection])
    useEffect(() => {
        if(page < 3){
            setStartPageOfSelection(1)
        }
        else if(page >= 3 && page <= 498){
            setStartPageOfSelection(page - 1)
        }
        else{
            setStartPageOfSelection(498)
        }
    }, [page]);

    useEffect(() => {
        setCursorGenre(genreId ? genreId : '1')
    }, [genreId])

    const genreQuery = useGenreQuery();
    const genreIdObj: GenreIdObjType = useMemo(() => {
        return genreQuery.data?.reduce((accum: {[key: number]: string}, genre) => {
            accum[genre.id] = genre.name.toLowerCase()
            return accum
        }, {})
    }, [genreQuery.data])

    const {opacity} = useAppSelector(({opacitySlice}) => opacitySlice)

    if(moviesQuery.isLoading) return <div>Loading...</div>
    if(moviesQuery.data?.results.length === 0){
        throw new Error("404 Couldn't find page", {cause: {status: 404}})
    }
    if(moviesQuery.isError){
        showBoundary(moviesQuery.error)
    }

    const handleSelection = {
        handlePreviousSelection: () => {
            PreviousSelection(startPageOfSelection, setStartPageOfSelection)
        },
        handleNextSelection: () => {
            if(moviesQuery.data){
                NextSelection(startPageOfSelection, setStartPageOfSelection)
            }
        }
    }

    return (
        <main className="h-[80%] flex flex-col justify-between mt-5" style={{opacity: opacity}}>
            <section className="mb-10">
                <h2 className="genreTitle">{genreIdObj && genreIdObj[Number(genreId)].charAt(0).toUpperCase() + genreIdObj[Number(genreId)].slice(1)}</h2>
                <div className="grid grid-cols-5 gap-3 mt-3 ">
                    {moviesQuery.data?.results.map(movie => <MoviesListCardComponent key={movie.id} movie={movie}/>)}
                </div>
            </section>
            <section className="flex justify-evenly mt-10 mb-10">
                <PageScrollingComponent startPageOfSelection={startPageOfSelection} pageSelectionOutput={pageSelectionOutput} total_pages={500} handleSelection={handleSelection} setQuery={setQuery}/>
            </section>
        </main>
    );
};

//Make category of films
