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
            <div className="w-full h-[600px] relative opacity-40 bg-cover bg-position-[0_-250px] max-[756px]:h-[500px] max-[756px]:bg-position-[0]" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original` + mainMovie.poster_path}}></div>
            <div className="start-movie w-full h-[600px] pl-8 flex gap-2 absolute top-0 max-[968px]:flex-col max-[756px]:top-[-50px]" >
                <div className="w-[60%] h-full text-xl flex flex-col justify-center items-center gap-3 max-[968px]:w-full text-center">
                    <p>{mainMovie.title ? mainMovie.title : STUB}</p>
                    <p>{mainMovie.overview ? mainMovie.overview : STUB}...</p>
                    <div className="w-[95%] flex justify-between text-center">
                        <p>{mainMovie.release_date ? mainMovie.release_date.toString().slice(0, 4) : STUB}</p>
                        <Progress strokeWidth={9} percentage={+(mainMovie.vote_average ? mainMovie.vote_average.toPrecision(2) : 0)*10}/>
                    </div>
                    <Link className="bg-blue-500 w-[120px] pt-2 pb-2 rounded-[2px]" to = {`/movie/${mainMovie.id}`}>Watch</Link>
                </div>
                <div className="m-auto w-[350px] max-[968px]:w-[0] max-[968px]:text-[10px]">
                    {mainMovie.poster_path ? <PosterPreviewComponent movie={mainMovie}/> : <div><img src={image_not_found} alt={"image not found"}/></div>}
                </div>
            </div>
        </div>
    );
};