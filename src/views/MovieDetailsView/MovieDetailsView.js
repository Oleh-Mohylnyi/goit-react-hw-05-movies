import { useEffect, useState, lazy, Suspense } from "react";
import { Route, NavLink, useParams, useRouteMatch, Switch, useLocation, useHistory } from "react-router-dom";
import * as movieApi from '../../services/moviesApi/moviesApi';
import alternativePicture from '../../images/cinema-movie.jpg';
import Loader from "../../components/loader/loader";
import Spinner from "react-loader-spinner";
import s from './movieDetailsView.module.scss';

const MovieSubCast = lazy(() => import('../MovieSubCast/MovieSubCast'));
const MovieSubReviews = lazy(() => import ('../MovieSubReviews/MovieSubReviews'));

export default function MovieDetailsView() {
    const [movieDetails, setMovieDetails] = useState(null);
    const [status, setStatus] = useState("idle");

    const { movieId } = useParams();
    const { url, path } = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const locationToBack=location?.state?.from?.location ?? '/movies';
    const labelToBack=location?.state?.from?.label ?? 'Go back'

    useEffect(() => {
        setStatus ("pending");

        movieApi.fetchDetails(movieId)
            .then(response => {
            setMovieDetails(response)
            setStatus ("resolved")

        }
            )
    }, [movieId])

    const onGoBack = () => {
        history.push(locationToBack)
    }

    return (
        <>
            <button type="button"
                className={s.Button}
                onClick={onGoBack}>
                {labelToBack}
            </button>

            {(status === 'pending') &&
                <Spinner type="ThreeDots" color="black" />
            }

            {(status === 'resolved') &&
            <>
            <div className={s.Card}>
                <img alt=""
                    width="300px"
                    className={s.Image} 
                    src={movieDetails.poster_path
                        ?`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
                        :alternativePicture}>
                </img>
                <div className={s.InfoList}>
                    <h1 className={s.Title} >{movieDetails.original_title}</h1>
                    <ul>
                        
                        {movieDetails.vote_average &&
                            <li>
                                <h2>Average</h2>
                                <p>{movieDetails.vote_average}</p>
                            </li>
                        }
                        {movieDetails.overview &&
                            <li>
                                <h2>Overview</h2>
                                <p>{movieDetails.overview}</p>
                            </li>
                        }
                        {movieDetails.genres &&
                            <li>
                                <h2>Genres</h2>
                                <p>{movieDetails.genres.reduce((acc, genre) => acc=acc+" "+genre.name, '')}</p>
                            </li>
                        }
                    </ul>
                </div>
            </div>
            <div className={s.SubNavBar}>
                    <hr/>
                    <h2>Additional Information</h2>
                <ul className={s.SubInfoList}>
                    <li>
                        <NavLink to={{
                            pathname: `${url}/cast`,
                            state: {from: {location: locationToBack, label: labelToBack}}
                            }}
                                activeClassName={s.ActiveLink}
                                className={s.Link}
                                exact>
                                Cast
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{
                            pathname: `${url}/review`,
                            state: {from: {location: locationToBack, label: labelToBack}}
                            }}
                                activeClassName={s.ActiveLink}
                                className={s.Link}
                                exact>
                                Reviews
                        </NavLink>
                    </li>
                </ul>
                <hr/>
            </div>
            </>}
            
            <Suspense fallback={<Loader />}>
            <Switch>
                <Route path={`${path}/cast`}>
                    <MovieSubCast/>
                </Route>
                <Route path={`${path}/review`}>
                    <MovieSubReviews/>
                </Route>
            </Switch>
            </Suspense>
        </>
    )
}