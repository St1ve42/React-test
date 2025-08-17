import {useParams, useSearchParams} from "react-router-dom";
import {useGenreQuery} from "../../tanstackquery/hooks/queries/useGenreQuery.tsx";
import type {UseQueryResult} from "@tanstack/react-query";
import type {DataMovieType} from "../../models/MovieType.ts";
import {useEffect, useMemo, useRef, useState} from "react";
import {MoviesListCardComponent} from "../moviesListCard/MoviesListCardComponent.tsx";
import {useAppSelector} from "../../redux/hooks/useApp.ts";
import {useMovieByGenreQuery} from "../../tanstackquery/hooks/queries/useMovieByGenreQuery.tsx";
import './MoviesListStyle.css'
import {pageSelection} from "../../utils/utils.ts";
import {PageScrollingComponent} from "../pageScrolling/PageScrollingComponent.tsx";
import {useErrorBoundary} from "react-error-boundary";

const optionItems = ["All", "Popularity", "Primary release date", "Average vote"]
const directionItems = ["ascending", "descending"]
type SortRelatedType<T> = {
    [key: string]: T | null
    option: T | null,
    direction: T | null
}
type MoviesQueryType = UseQueryResult<DataMovieType, Error>
type GenreIdObjType = {
    [key: number]: string
} | undefined


export const MoviesListComponent = () => {

    //Params data and their handling
    const {genreId} = useParams()
    const [query, setQuery] = useSearchParams({page: ''})
    const pageString = query.get("page")
    if(pageString && pageString === "1"){
        setQuery({})
    }
    const page = pageString ? Number(pageString) : 1

    const [cursorGenre, setCursorGenre] = useState<string>(genreId ? genreId : '33')
    useEffect(() => {
        setCursorGenre(genreId ? genreId : '1')
    }, [genreId])

    //DropdownMenu Data and their handling
    const [isOpenMenu, setIsOpenMenu] = useState<SortRelatedType<boolean>>({option: null, direction: null})
    const [selectedValue, setSelectedValue] = useState<SortRelatedType<string>>({option: null, direction: "descending"})
    const [sortOptionDropdownRef, sortDirectionDropdownRef] = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)]

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sortOptionDropdownRef.current && !sortOptionDropdownRef.current.contains(event.target)){
                setIsOpenMenu(prevState => {
                    return {...prevState, option: false}
                })
            }
            if(sortDirectionDropdownRef.current && !sortDirectionDropdownRef.current.contains(event.target)){
                setIsOpenMenu(prevState => {
                    return {...prevState, direction: false}
                })
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleToggle = (event) => {
        if (sortOptionDropdownRef.current && sortOptionDropdownRef.current.contains(event.target)){
            setIsOpenMenu(prevState => {
                return {...prevState, option: true}
            })
        }
        else if(sortDirectionDropdownRef.current && sortDirectionDropdownRef.current.contains(event.target)){
            setIsOpenMenu(prevState => {
                return {...prevState, direction: true}
            })
        }
    };

    const handleSelect = (event, value) => {
        if (sortOptionDropdownRef.current && sortOptionDropdownRef.current.contains(event.target)){
            setSelectedValue(prevState => {
                return {...prevState, option: value}
            })
            setIsOpenMenu(prevState => {
                return {...prevState, option: false}
            })
        }
        else if(sortDirectionDropdownRef.current && sortDirectionDropdownRef.current.contains(event.target)){
            setSelectedValue(prevState => {
                return {...prevState, direction: value}
            })
            setIsOpenMenu(prevState => {
                return {...prevState, direction: false}
            })
        }
    };

    //movie data
    const moviesQuery: MoviesQueryType = useMovieByGenreQuery(Number(cursorGenre), page, selectedValue)
    const totalPage = moviesQuery.data ? (moviesQuery.data.total_pages <= 500 ? moviesQuery.data?.total_pages : 500) : 498

    //page data
    const [startPageOfSelection, setStartPageOfSelection] = useState(1)
    const pageSelectionOutput: number[] = useMemo(() => pageSelection(startPageOfSelection), [startPageOfSelection])
    useEffect(() => {
        if(page < 3){
            setStartPageOfSelection(1)
        }
        else if(page===3){
            setStartPageOfSelection(page)
        }
        else if(page > 3 && page < totalPage-2){
            setStartPageOfSelection(page - 1)
        }
        else if(page === totalPage-2){
            setStartPageOfSelection(page)
        }
        else{
            setStartPageOfSelection(totalPage-2)
        }
    }, [page]);

    //genre data
    const genreQuery = useGenreQuery();
    const genreIdObj: GenreIdObjType = useMemo(() => {
        return genreQuery.data?.reduce((accum: {[key: number]: string}, genre) => {
            accum[genre.id] = genre.name.toLowerCase()
            return accum
        }, {})
    }, [genreQuery.data])

    //transitional css property
    const {opacity} = useAppSelector(({opacitySlice}) => opacitySlice)

    //Loading and Error handling
    const {showBoundary} = useErrorBoundary()
    if(moviesQuery.isLoading) return <div>Loading...</div>


    if(moviesQuery.data?.results.length === 0){
        throw new Error("404 Couldn't find page", {cause: {status: 404}})
    }

    if(moviesQuery.isError){
        showBoundary(moviesQuery.error)
    }

    if(!moviesQuery.data) return <></>

    const handleSelection = {
        handlePreviousSelection: () => {
            if(startPageOfSelection > 2){
                setQuery({page: (page-1).toString()})
            }
        },
        handleNextSelection: () => {
            if(startPageOfSelection <= 498){
                setQuery({page: (page+1).toString()})
            }
        }
    }

    return (
        <main className="h-[80%] flex flex-col justify-between mt-5" style={{opacity: opacity}}>
            <section>
                <div className="flex justify-between">
                    <h2 className="genreTitle">{genreIdObj && genreIdObj[Number(genreId)].charAt(0).toUpperCase() + genreIdObj[Number(genreId)].slice(1)}</h2>
                    <div className="w-[400px] flex justify-end gap-3">
                        <div className="custom-dropdown-container" ref={sortOptionDropdownRef}>
                            <div className="dropdown-header" onClick={handleToggle}>
                                {selectedValue["option"] ? selectedValue["option"] : 'All'}
                            </div>

                            {isOpenMenu["option"] && (
                                <ul className="dropdown-list">
                                    {optionItems.map((item) => (
                                        <li
                                            key={item}
                                            onClick={(event) => handleSelect(event, item)}
                                            className="dropdown-list-item"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="custom-dropdown-container" ref={sortDirectionDropdownRef}>
                            <div className="dropdown-header" onClick={handleToggle}>
                                {selectedValue["direction"] ? selectedValue["direction"] : 'Desc'}
                            </div>

                            {isOpenMenu["direction"] && (
                                <ul className="dropdown-list">
                                    {directionItems.map((item) => (
                                        <li
                                            key={item}
                                            onClick={(event) => handleSelect(event, item)}
                                            className="dropdown-list-item"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-3 mt-3 ">
                    {moviesQuery.data.results.map(movie => <MoviesListCardComponent key={movie.id} movie={movie}/>)}
                </div>
            </section>
            <section className="flex justify-evenly mt-10 mb-10">
                <PageScrollingComponent startPageOfSelection={startPageOfSelection} pageSelectionOutput={pageSelectionOutput} total_pages={totalPage} handleSelection={handleSelection} setQuery={setQuery}/>
            </section>
        </main>
    );
};

