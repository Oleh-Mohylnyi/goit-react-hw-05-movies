import { useEffect, useState, lazy, Suspense } from "react";
import { Route, NavLink, useParams, useRouteMatch, Switch, useLocation, useHistory } from "react-router-dom";
import * as movieApi from '../../services/moviesApi/moviesApi';

import Loader from "../../components/loader/loader";
import Spinner from "react-loader-spinner";
import s from './movieDetailsView.module.scss';
import MovieCard from '../../components/MovieCard/MovieCard'

const MovieSubCast = lazy(() => import('../../components/MovieSubCast/MovieSubCast'));
const MovieSubReviews = lazy(() => import ('../../components/MovieSubReviews/MovieSubReviews'));

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
                <MovieCard movieDetails={movieDetails} />
                
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