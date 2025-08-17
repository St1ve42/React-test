import {Progress} from "../progressBar/ProgressBarComponent.tsx";
import {Link} from "react-router-dom";
import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import type {MovieType} from "../../models/MovieType.ts";
import type {FC} from "react";
import {STUB} from "../../utils/utils.ts";
import image_not_found from '../../assets/image_not_found.jpg'

type PropsType = {
    mainMovie : MovieType;
}

export const MainMoviesListComponent: FC<PropsType> = ({mainMovie}) => {
    return (
        <div>
            <div className="w-full h-[600px] relative opacity-40 bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original` + mainMovie.poster_path, backgroundPosition: "right -250px"}}></div>
            <div className="start-movie w-full h-[600px] self-center pl-8 flex items-center gap-5 absolute top-0" >
                <div className="w-[60%] h-full text-[20px] flex flex-col justify-center items-center gap-10">
                    <p className="text-center">{mainMovie.title ? mainMovie.title : STUB}</p>
                    <p>{mainMovie.title ? mainMovie.overview : STUB}...</p>
                    <div className="w-full flex justify-between">
                        <p>{mainMovie.release_date ? mainMovie.release_date.toString().slice(0, 4) : STUB}</p>
                        <Progress strokeWidth={9} percentage={+(mainMovie.vote_average ? mainMovie.vote_average.toPrecision(2) : 0)*10}/>
                    </div>
                    <Link className="bg-blue-500 w-[120px] pt-2 pb-2 text-center rounded-[2px]" to = {`/movie/${mainMovie.id}`}>Watch</Link>
                </div>
                <div className="w-[350px] m-auto">
                    {mainMovie.poster_path ? <PosterPreviewComponent movie={mainMovie}/> : <div><img src={image_not_found} alt={"image not found"}/></div>}
                </div>
            </div>
        </div>
    );
};