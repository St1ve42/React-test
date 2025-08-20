import './HeaderStyle.css'
import {Link} from "react-router-dom";
import {UserInfoComponent} from "../userInfo/UserInfoComponent.tsx";
import {SearchedMoviesComponent} from "../searchedMovies/SearchedMoviesComponent.tsx";
import {useHeader} from "./useHeader.tsx";

export const HeaderComponent = () => {
    const {isVisible, setIsVisible, handleHamburgerMenuGenreDropdown, isVisibleHamburgerMenu, isVisibleMobileSearch, setIsVisibleMobileSearch, searchContentRef, genreQuery, searchedMoviesQuery, setIsVisibleHamburgerMenu, mobileSearchHeaderRef, mobileSearchContentRef, handleMouseGenre, handleSearchedMovie, handleInputChange} = useHeader()
    return (
        <header className="bg-[#020C24] text-xl h-15 flex justify-between items-center pad sticky top-0 z-2">

            <div className="flex">

                {/*Logo*/}
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
                        <Link to={''} className="logotext">KinoLand</Link>
                    </p>
                </div>
                {/*Hamburger-menu*/}
                <div className="custom-dropdown-container-hamburger-menu min-[832px]:hidden">
                    <div className="dropdown-header-hamburger-menu" onClick={() => {
                        setIsVisibleHamburgerMenu(!isVisibleHamburgerMenu);
                    }}>
                        <svg width="32px" height="32px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Menu</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Menu"> <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="5" y1="7" x2="19" y2="7" id="Path" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"> </line> <line x1="5" y1="17" x2="19" y2="17" id="Path" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"> </line> <line x1="5" y1="12" x2="19" y2="12" id="Path" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"> </line> </g> </g> </g></svg>
                    </div>
                    {isVisibleHamburgerMenu && <div className="dropdown-list-hamburger-menu">
                        <div className="cursor-pointer w-15 text-center home-link__isActive"><Link to={''} onClick={() => {
                            setIsVisibleHamburgerMenu(false);
                        }}>Home</Link></div>
                        <div className="dropdown" onMouseOver={handleMouseGenre} onMouseOut={handleMouseGenre}>
                            <div className="cursor-pointer w-15 text-center"><Link to={genreQuery.data ? `genre/${genreQuery.data[0].id}` : ''}>Genre</Link></div>
                            <div className="dropdown-content" style={{display: isVisible ? 'block' : 'none'}}>
                                <div className="grid grid-rows-5 grid-flow-col flex-wrap gap-2">
                                    {genreQuery.data && genreQuery.data.map(genre => <Link to={`genre/${genre.id}`} onClick = {handleHamburgerMenuGenreDropdown} key={genre.id}>
                                        <div key={genre.id} className="text-center">{genre.name}</div>
                                    </Link>)}
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

            {/*Navigation*/}
            <div className="flex gap-5 topnav max-[832px]:hidden">
                <div className="dropdown" onMouseOver={handleMouseGenre} onMouseOut={handleMouseGenre}>
                    <div className="cursor-pointer w-15 text-center"><Link to={genreQuery.data ? `genre/${genreQuery.data[0].id}` : ''}>Genre</Link></div>
                    <div className="dropdown-content" style={{display: isVisible ? 'block' : 'none'}}>
                        <div className="grid grid-rows-5 grid-flow-col flex-wrap gap-2">
                            {genreQuery.data && genreQuery.data.map(genre => <Link to={`genre/${genre.id}`} onClick={() => setIsVisible(!isVisible)} key={genre.id}>
                                <div key={genre.id} className="text-center">{genre.name}</div>
                            </Link>)}
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer w-15 text-center home-link__isActive"><Link to={''}>Home</Link></div>
            </div>

            {/*Mobile search*/}
            <div className="flex gap-5 min-[832px]:hidden">
                <div className="custom-dropdown-container-search">
                    <div className="dropdown-header-search" onClick={() => {
                        setIsVisibleMobileSearch(!isVisibleMobileSearch);
                    }}>
                        <svg className="mt-1" width="23px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                    stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                    {isVisibleMobileSearch && <div ref={mobileSearchHeaderRef} className="dropdown-content-search">
                        <div className="cursor-pointer w-15 text-center home-link__isActive">
                            <Link to={''} onClick={() => {
                                setIsVisibleMobileSearch(!isVisibleMobileSearch);
                            }}>
                            </Link>
                        </div>
                        <div className="search-dropdown">
                            <input type="search" name="search" autoComplete="off" placeholder="Search" onChange={handleInputChange}/>
                            <div ref={mobileSearchContentRef} className="dropdown-searched-content">
                                {searchedMoviesQuery.data?.results.length !== 0 ? searchedMoviesQuery.data?.results.map(movie => {
                                    return (
                                        <Link key={movie.id} to={`/movie/${movie.id}`} onClick={handleSearchedMovie}><SearchedMoviesComponent movie={movie}/></Link>
                                    )
                                }) : <span>There is no matched result</span>}
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="mt-2.5">
                    <UserInfoComponent/>
                </div>
            </div>

            <div className="w-[300px] flex items-center justify-between gap-5 max-[832px]:hidden">
                {/*Search*/}
                <div className="flex gap-2">
                    <svg className="mt-1" width="23px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                    </svg>
                    <div className="search-dropdown">
                        <input type="search" name="search" autoComplete="off" placeholder="Search" onChange={handleInputChange}/>
                        <div ref={searchContentRef} className="dropdown-searched-content">
                            {searchedMoviesQuery.data?.results.length !== 0 ? searchedMoviesQuery.data?.results.map(movie => {
                                return (
                                    <Link key={movie.id} to={`/movie/${movie.id}`} onClick={handleSearchedMovie}><SearchedMoviesComponent movie={movie}/></Link>
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

