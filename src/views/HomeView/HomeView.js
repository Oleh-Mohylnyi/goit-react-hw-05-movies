import { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import * as movieApi from '../../services/moviesApi/moviesApi'
import Spinner from "react-loader-spinner";
import s from './homeView.module.scss';
import GalleryItem from "../../components/GallaryItem/GalleryItem";


export default function HomeView() {
    const [moviesTrending, setMoviesTrending] = useState(() => {
        return JSON.parse(localStorage.getItem('trendingMovies')) ?? null
    })
    
    const [status, setStatus] = useState("idle");
    
    const location = useLocation();
    const todayDate = new Date().toLocaleDateString();
    const trendingMoviesDate = JSON.parse(localStorage.getItem('trendingMoviesDate')) ?? "";

    useEffect(() => {
        if (moviesTrending !== "" &&
            trendingMoviesDate === todayDate) {
            return
        }
        setStatus ("pending");
        movieApi.fetchTrending()
            .then(response => {
            setMoviesTrending(response.results)
            setStatus ("resolved")
            localStorage.setItem('trendingMovies', JSON.stringify(response.results))
            localStorage.setItem('trendingMoviesDate', JSON.stringify(todayDate))
            })
            // eslint-disable-next-line
    }, [])
    
    return (
        <>
            <div >
                {(status === 'pending') &&
                    <Spinner type="ThreeDots" color="black" />
                }
            <ul className={s.Gallery}>
                {(status === 'resolved'||moviesTrending) && moviesTrending.map(movie =>
                    <GalleryItem key={movie.id}
                        location={location}
                        movie={movie} />
                )}
            </ul>
            </div>

        </>
    )
}