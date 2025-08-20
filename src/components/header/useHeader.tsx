import {type ChangeEventHandler, type MouseEventHandler, useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../redux/hooks/useDispatch.ts";
import {transitionalSlice} from "../../redux/slices/transitionalSlice.ts";
import {useGenreQuery} from "../../tanstackquery/hooks/queries/useGenreQuery.tsx";
import {useMoviesBySearchQuery} from "../../tanstackquery/hooks/queries/useMoviesBySearchQuery.tsx";

export const useHeader = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleHamburgerMenu, setIsVisibleHamburgerMenu] = useState(false);
    const [isVisibleMobileSearch, setIsVisibleMobileSearch] = useState(false);
    const [search, setSearch] = useState<string>('');
    const genreQuery = useGenreQuery()
    const searchedMoviesQuery = useMoviesBySearchQuery(search)
    const searchContentRef = useRef<HTMLDivElement>(null)
    const mobileSearchHeaderRef = useRef<HTMLDivElement>(null)
    const mobileSearchContentRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const handleMouseGenre: MouseEventHandler<HTMLDivElement> = (e) => {
        if(e.type === "mouseover") {
            dispatch(transitionalSlice.actions.setOpacity('0.5'))
            setIsVisible(true);
        }
        else if(e.type === "mouseout"){
            dispatch(transitionalSlice.actions.setOpacity('1'))
            setIsVisible(false);
        }
    }

    const handleHamburgerMenuGenreDropdown = () =>{
        setIsVisible(!isVisible);
        setIsVisibleHamburgerMenu(false);
    }

    useEffect(() => {
        const handleOutsideClick: EventListenerOrEventListenerObject = (event) => {
            if(searchContentRef.current && !searchContentRef.current.contains(event.target as Node)){
                searchContentRef.current.style.display = "none";
                dispatch(transitionalSlice.actions.setOpacity('1'))
            }
            if(mobileSearchHeaderRef.current && !mobileSearchHeaderRef.current.contains(event.target as Node) && mobileSearchContentRef.current && mobileSearchContentRef.current.style.display === "none"){
                mobileSearchHeaderRef.current.style.display = "none";
                dispatch(transitionalSlice.actions.setOpacity('1'))
            }
            if(mobileSearchContentRef.current && !mobileSearchContentRef.current.contains(event.target as Node)){
                mobileSearchContentRef.current.style.display = "none";
                dispatch(transitionalSlice.actions.setOpacity('1'))
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleSearchedMovie = () => {
        if(searchContentRef.current){
            searchContentRef.current.style.display = "none"
        }
        dispatch(transitionalSlice.actions.setOpacity('1'))
        setSearch('')
        setIsVisibleMobileSearch(false);
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if(searchContentRef.current && e.target.value === ""){
            searchContentRef.current.style.display = "none"
            dispatch(transitionalSlice.actions.setOpacity('1'))
        }
        else if (mobileSearchContentRef.current && e.target.value === ""){
            mobileSearchContentRef.current.style.display = "none";
            dispatch(transitionalSlice.actions.setOpacity('1'))
        }
        else if (mobileSearchHeaderRef.current && e.target.value === ""){
            mobileSearchHeaderRef.current.style.display = "none";
            dispatch(transitionalSlice.actions.setOpacity('1'))
        }
        else{
            if(searchContentRef.current){
                searchContentRef.current.style.display = "block"
                searchContentRef.current.scrollTop = 0
            }
            if(mobileSearchHeaderRef.current){
                mobileSearchHeaderRef.current.style.display = "block"
                mobileSearchHeaderRef.current.scrollTop = 0
            }
            if(mobileSearchContentRef.current){
                mobileSearchContentRef.current.style.display = "block"
                mobileSearchContentRef.current.scrollTop = 0
            }
            dispatch(transitionalSlice.actions.setOpacity('0.5'))
            setSearch(e.target.value)
        }
    }

    return {genreQuery, searchedMoviesQuery, isVisible, setIsVisible, isVisibleHamburgerMenu, setIsVisibleHamburgerMenu, isVisibleMobileSearch, setIsVisibleMobileSearch, search, searchContentRef, mobileSearchHeaderRef,
        mobileSearchContentRef, handleMouseGenre, handleHamburgerMenuGenreDropdown, handleSearchedMovie, handleInputChange}
};