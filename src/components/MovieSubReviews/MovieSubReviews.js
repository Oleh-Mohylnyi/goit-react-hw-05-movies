import { useParams } from "react-router-dom"
import * as movieApi from '../../services/moviesApi/moviesApi';
import { useEffect, useState } from "react";
import Spinner from "react-loader-spinner";


export default function MovieSubReviews() {
    const [movieReviews, setMovieReviews] = useState(null)
    const [status, setStatus] = useState("idle")

    const { movieId } = useParams();

    useEffect(() => {
        setStatus ("pending");

        movieApi.fetchReviews(movieId)
            .then(response => {
                if (response.results.length === 0) {
                    setStatus("reject")
                    return
                }
            setMovieReviews(response)
            setStatus ("resolved")
            })
            .catch (err => setStatus("reject"));
    }, [movieId])

    return (
        <>
            {(status === 'pending') &&
                <Spinner type="ThreeDots" color="black" />
            }
            <ul> 
                {status === 'resolved' &&
                    movieReviews.results.map(review =>
                        <li key={review.id}>
                            <h4>{review.author} :</h4>
                            <p>"{review.content}"</p>
                        </li>
                    )}
            </ul>
            {(status === 'reject') &&
                <h2>Unfortunately, there are no reviews at this time!</h2>
            }
        </>        
    )
}