import { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import * as movieApi from '../../services/moviesApi/moviesApi'
import Spinner from "react-loader-spinner";
// import s from './homeView.module.scss';
import Gallery from "../../components/Gallery/Gallery";


export default function HomeView() {
    const [moviesTrending, setMoviesTrending] = useState(() => {
        return JSON.parse(localStorage.getItem('trendingMovies')) ?? null
    })
    const [status, setStatus] = useState("idle");
    
    const location = useLocation();
    const todayDate = new Date().toLocaleDateString();
    const trendingMoviesDate = JSON.parse(localStorage.getItem('trendingMoviesDate')) ?? "";

    function responseProcessing(response) {
        setMoviesTrending(response.results)
        setStatus ("resolved")
        localStorage.setItem('trendingMovies', JSON.stringify(response.results))
        localStorage.setItem('trendingMoviesDate', JSON.stringify(todayDate))
    }

    useEffect(() => {
        if (moviesTrending !== null &&
            trendingMoviesDate === todayDate) {
            return
        }
        setStatus ("pending");
        movieApi.fetchTrending()
            .then(responseProcessing)
            .catch(err => setStatus("reject"));
        
            // eslint-disable-next-line
    }, [])
    
    return (
        <>
            <div >
                {(status === 'pending') &&
                    <Spinner type="ThreeDots" color="black" />
                }
                {(status === 'resolved'||moviesTrending) &&
                <Gallery status={status}
                    movies={moviesTrending}
                    location={location}
                />
                }
                {(status === 'reject') && <h2>{`no results found for request`}</h2>}
            </div>
        </>
    )
}