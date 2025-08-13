import './HeaderStyle.css'
import {Link} from "react-router-dom";
import {useGenreQuery} from "../../tanstackquery/hooks/queries/useGenreQuery.tsx";
import {useAppDispatch} from "../../redux/hooks/useDispatch.ts";
import {opacitySlice} from "../../redux/slices/opacity.slice.ts";
import {type ChangeEventHandler, type MouseEventHandler, useRef, useState} from "react";
import {useMovieBySearchQuery} from "../../tanstackquery/hooks/queries/useMovieBySearchQuery.tsx";
import {UserInfoComponent} from "../userInfo/UserInfoComponent.tsx";
import {SearchedMoviesComponent} from "../searchedMovies/SearchedMoviesComponent.tsx";

export const HeaderComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState<string>('');
    const divRef = useRef<HTMLDivElement>(null)
    const {data} = useGenreQuery()
    const searchedMovies = useMovieBySearchQuery(search)
    const dispatch = useAppDispatch()


    if(searchedMovies.isLoading) return <div>Loading...</div>

    const MouseGenreHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        if(e.type === "mouseover") {
            dispatch(opacitySlice.actions.setOpacity('0.5'))
            setIsVisible(true);
        }
        else if(e.type === "mouseout"){
            dispatch(opacitySlice.actions.setOpacity('1'))
            setIsVisible(false);
        }
    }

    const handleGenreDropDown = () =>{
        if(isVisible){
            setIsVisible(false);
        }
        else{
            setIsVisible(true);
        }
    }

    const handleSearchedMovie = () => {
        if(divRef.current){
            divRef.current.style.display = "none"
        }
        dispatch(opacitySlice.actions.setOpacity('1'))
        setSearch('')
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if(divRef.current && e.target.value === ""){
            divRef.current.style.display = "none"
            dispatch(opacitySlice.actions.setOpacity('1'))
        }
        else{
            if(divRef.current){
                divRef.current.style.display = "block"
                divRef.current.scrollTop = 0
                dispatch(opacitySlice.actions.setOpacity('0.5'))
            }
            setSearch(e.target.value)
        }
    }


    return (
        <header className="bg-[#020C24] h-15 flex justify-between items-center pad sticky top-0 z-1">
            <div className="flex items-center gap-3">
                <svg height="40px" width="40px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                     role="img"
                     className="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <circle cx="32" cy="32" r="30" fill="#4fd1d9"></circle>
                        <path fill="#ffffff" d="M25 12l20 20l-20 20z"></path>
                    </g>
                </svg>
                <p>
                    <Link to = {''} className="logotext">KinoLand</Link>
                </p>
            </div>
            <div className="flex gap-5">
                <div className="dropdown" onMouseOver={MouseGenreHandler} onMouseOut={MouseGenreHandler}>
                    <div className="cursor-pointer w-15 text-center"><Link to = {data ? `genre/${data[0].id}` : ''}>Genre</Link></div>
                    <div className="dropdown-content" style={{display: isVisible ? 'block' : 'none'}}>
                        <div className="grid grid-rows-5 grid-flow-col flex-wrap gap-2">
                            {data && data.map(genre =><Link to = {`genre/${genre.id}`} onClick={handleGenreDropDown} key={genre.id}> <div key={genre.id} className="text-center">{genre.name}</div></Link>)}
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer w-15 text-center home-link__isActive"><Link to = {''}>Home</Link></div>
            </div>
            <div className="w-[300px] flex items-center justify-between gap-5">
                <div className="flex gap-2">
                    <svg className="mt-1" width="23px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    <div className="search-dropdown">
                        <form>
                            <input type="search" name="search" autoComplete="off" placeholder="Search" onChange={handleChange}/>
                        </form>
                        <div ref = {divRef} className="dropdown-searched-content">
                            {searchedMovies.data?.results.length !==0 ? searchedMovies.data?.results.map(movie => {
                                return(
                                    <Link to={`/movie/${movie.id}`} onClick={handleSearchedMovie}><SearchedMoviesComponent movie={movie}/></Link>
                                )
                            }) : <span>There is no matched result</span>}
                        </div>
                    </div>
                </div>
                <UserInfoComponent/>
            </div>
        </header>
    );
};