import { useParams } from "react-router-dom"
import * as movieApi from '../../services/moviesApi/moviesApi';
import { useEffect, useState } from "react";
import aneousAvatar from '../../images/aneous-avatar-user.png';
import Spinner from "react-loader-spinner";


export default function MovieSubCast() {
    const [movieCasts, setMovieCasts] = useState(null)
    const [status, setStatus] = useState("idle")

    const { movieId } = useParams();

    useEffect(() => {
        setStatus ("pending");

        movieApi.fetchCast(movieId)
            .then(response => {
            if (response.cast.length === 0) {
                    setStatus("reject")
                    return
            }
            setMovieCasts(response)
            setStatus ("resolved")
            })
        .catch(err => setStatus("reject"));
    }, [movieId])

    return (
        <>
                {(status === 'pending') &&
                    <Spinner type="ThreeDots" color="black" />
                }
            <ul> 
                {status === 'resolved' &&
                    movieCasts.cast.map(cast =>
                        <li key={cast.id}>
                            {<img alt=""
                                width="200px"
                                src={cast.profile_path
                                    ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
                                    : aneousAvatar}>
                            </img>
                            }
                            <ul>
                                {cast.character &&
                                    <li>
                                        <h3>Character</h3>
                                        <p>{cast.character}</p>
                                    </li>}
                                {cast.name &&
                                    <li>
                                        <h3>Name</h3>
                                        <p>{cast.name}</p>
                                    </li>}
                            </ul>
                        </li>
                    )}
            </ul>
                {(status === 'reject') &&
                    <h2>Unfortunately, there is no cast list!</h2>
                }
        </>        
    )
}