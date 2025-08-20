import {type MouseEventHandler} from "react";
import {MovieListCardComponent} from "../movieListCard/MovieListCardComponent.tsx";
import './MoviesListStyle.css'
import {PageScrollingComponent} from "../pageScrolling/PageScrollingComponent.tsx";
import {useMovieLists} from "./useMovieLists.tsx";

const optionItems = ["All", "Popularity", "Primary release date", "Average vote"]
const directionItems = ["ascending", "descending"]

export const MovieListsComponent = () => {
    const {setQuery, genreId, isOpenMenu, selectedValue, sortOptionDropdownRef, sortDirectionDropdownRef, moviesQuery, opacity, genreIdObj, showBoundary, startPageOfSelection, totalPage, pageSelectionOutput, handleToggle, handleSelect, handleSelection} = useMovieLists()

    if(moviesQuery.isLoading) return <div>Loading...</div>


    if(moviesQuery.data?.results.length === 0){
        throw new Error("404 Couldn't find page", {cause: {status: 404}})
    }

    if(moviesQuery.isError){
        showBoundary(moviesQuery.error)
    }

    if(!moviesQuery.data) return <></>


    return (
        <main className="h-[80%] flex flex-col justify-between mt-5" style={{opacity: opacity}}>
            <section>
                <div className="flex justify-between header-movie-list">
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
                                            onClick={((event) => handleSelect(event, item)) as MouseEventHandler<HTMLLIElement>}
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
                                            onClick={((event) => handleSelect(event, item)) as MouseEventHandler<HTMLLIElement>}
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
                <div className="grid grid-cols-5 movie-list-container gap-3 mt-3 items-center">
                    {moviesQuery.data.results.map(movie => <MovieListCardComponent key={movie.id} movie={movie}/>)}
                </div>
            </section>
            <section className="flex justify-evenly mt-10 mb-10">
                <PageScrollingComponent startPageOfSelection={startPageOfSelection} pageSelectionOutput={pageSelectionOutput} total_pages={totalPage} handleSelection={handleSelection} setQuery={setQuery}/>
            </section>
        </main>
    );
};

