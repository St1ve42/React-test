import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layout/MainLayout.tsx";
import '../components/header/HeaderStyle.css'
import {MoviesPage} from "../pages/MoviesPage.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {MovieInfoComponent} from "../components/movieInfo/MovieInfoComponent.tsx";
import {ErrorRoutingComponent} from "../errors/ErrorRoutingComponent.tsx";

export const router = createBrowserRouter([
    {path: '', element: <MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: 'movie', element: <MovieInfoComponent/>, children: [
                    {path: ':movieId', element: <MovieInfoComponent/>}
                ]},
            {path: 'genre', element: <MoviesPage/>, children: [
                    {path: ':genreId', element: <MoviesPage/>}
            ]},
            {path: 'registration', element: <div>Registration</div>},
            {path: '*', element: <ErrorRoutingComponent/>}
        ]},
]);