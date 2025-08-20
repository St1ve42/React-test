import {useParams, useSearchParams} from "react-router-dom";
import {type MouseEventHandler, useEffect, useMemo, useRef, useState} from "react";
import * as React from "react";
import {useMoviesByGenreQuery} from "../../tanstackquery/hooks/queries/useMoviesByGenreQuery.tsx";
import {useGenreQuery} from "../../tanstackquery/hooks/queries/useGenreQuery.tsx";
import {useAppSelector} from "../../redux/hooks/useApp.ts";
import {useErrorBoundary} from "react-error-boundary";
import type {UseQueryResult} from "@tanstack/react-query";
import type {DataMovieType} from "../../models/MovieType.ts";
import {pageSelection} from "../../utils/utils.ts";

type SortRelatedType<T> = {
    [key: string]: T | null
    option: T | null,
    direction: T | null
}
type MoviesQueryType = UseQueryResult<DataMovieType, Error>
type GenreIdObjType = {
    [key: number]: string
} | undefined


export const useMovieLists = () => {
    //transitional property
    const {opacity} = useAppSelector(({transitionalSlice}) => transitionalSlice)

    //Params data and their handling
    const {genreId} = useParams()
    const [query, setQuery] = useSearchParams({page: ''})
    const pageString = query.get("page")
    if(pageString && pageString === "1"){
        setQuery({})
    }
    const pageNum = pageString ? Number(pageString) : 1

    const [cursorGenre, setCursorGenre] = useState<string>(genreId ? genreId : '33')
    useEffect(() => {
        setCursorGenre(genreId ? genreId : '1')
    }, [genreId])

    //DropdownMenu Data and their handling
    const [isOpenMenu, setIsOpenMenu] = useState<SortRelatedType<boolean>>({option: null, direction: null})
    const [selectedValue, setSelectedValue] = useState<SortRelatedType<string>>({option: null, direction: "descending"})
    const [sortOptionDropdownRef, sortDirectionDropdownRef] = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)]

    useEffect(() => {
        const handleOutsideClick: EventListenerOrEventListenerObject = (event) => {
            if (sortOptionDropdownRef.current && !sortOptionDropdownRef.current.contains(event.target as Node)){
                setIsOpenMenu(prevState => {
                    return {...prevState, option: false}
                })
            }
            if(sortDirectionDropdownRef.current && !sortDirectionDropdownRef.current.contains(event.target as Node)){
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

    const handleToggle: MouseEventHandler = (event) => {
        if (sortOptionDropdownRef.current && sortOptionDropdownRef.current.contains(event.target as Node)){
            setIsOpenMenu(prevState => {
                return {...prevState, option: true}
            })
        }
        else if(sortDirectionDropdownRef.current && sortDirectionDropdownRef.current.contains(event.target as Node)){
            setIsOpenMenu(prevState => {
                return {...prevState, direction: true}
            })
        }
    };

    const handleSelect: (event: React.MouseEvent<HTMLLIElement>, value: string) => void = (event, value) => {
        if (sortOptionDropdownRef.current && sortOptionDropdownRef.current.contains(event.target as Node)){
            setSelectedValue(prevState => {
                return {...prevState, option: value}
            })
            setIsOpenMenu(prevState => {
                return {...prevState, option: false}
            })
        }
        else if(sortDirectionDropdownRef.current && sortDirectionDropdownRef.current.contains(event.target as Node)){
            setSelectedValue(prevState => {
                return {...prevState, direction: value}
            })
            setIsOpenMenu(prevState => {
                return {...prevState, direction: false}
            })
        }
    };

    const handleSelection = {
        handlePreviousSelection: () => {
            if(startPageOfSelection > 2){
                setQuery({page: (pageNum-1).toString()})
            }
        },
        handleNextSelection: () => {
            if(startPageOfSelection <= 498){
                setQuery({page: (pageNum+1).toString()})
            }
        }
    }


    //movie data
    const moviesQuery: MoviesQueryType = useMoviesByGenreQuery(Number(cursorGenre), pageNum, selectedValue)
    const totalPage = moviesQuery.data ? (moviesQuery.data.total_pages <= 500 ? moviesQuery.data?.total_pages : 500) : 498

    //page data
    const [startPageOfSelection, setStartPageOfSelection] = useState(1)
    const pageSelectionOutput: number[] = useMemo(() => pageSelection(startPageOfSelection), [startPageOfSelection])
    useEffect(() => {
        if(pageNum < 3){
            setStartPageOfSelection(1)
        }
        else if(pageNum===3){
            setStartPageOfSelection(pageNum)
        }
        else if(pageNum > 3 && pageNum < totalPage-2){
            setStartPageOfSelection(pageNum - 1)
        }
        else if(pageNum === totalPage-2){
            setStartPageOfSelection(pageNum)
        }
        else{
            setStartPageOfSelection(totalPage-2)
        }
    }, [pageNum]);

    //genre data
    const genreQuery = useGenreQuery();
    const genreIdObj: GenreIdObjType = useMemo(() => {
        return genreQuery.data?.reduce((accum: {[key: number]: string}, genre) => {
            accum[genre.id] = genre.name.toLowerCase()
            return accum
        }, {})
    }, [genreQuery.data])

    //Loading and Error handling
    const {showBoundary} = useErrorBoundary()
    return {setQuery, genreId, isOpenMenu, selectedValue, sortOptionDropdownRef, sortDirectionDropdownRef, opacity, genreIdObj, showBoundary, startPageOfSelection, totalPage, pageSelectionOutput,moviesQuery, handleToggle, handleSelect, handleSelection}
};