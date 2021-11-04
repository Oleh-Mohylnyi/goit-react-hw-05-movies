import PropTypes from 'prop-types'

import s from './movieCard.module.scss';
import alternativePicture from '../../images/cinema-movie.jpg';

export default function MovieCard({movieDetails}) {
    const { poster_path, original_title, vote_average, overview, genres} = movieDetails

    return (
        <div className={s.Card}>
                <img alt=""
                    width="300px"
                    className={s.Image} 
                    src={poster_path
                        ?`https://image.tmdb.org/t/p/w300${poster_path}`
                        :alternativePicture}>
                </img>
                
                <div className={s.InfoList}>
                    <h1 className={s.Title} >{original_title}</h1>
                    <ul>
                        
                        {vote_average &&
                            <li>
                                <h2>Average</h2>
                                <p>{vote_average}</p>
                            </li>
                        }
                        {overview &&
                            <li>
                                <h2>Overview</h2>
                                <p>{overview}</p>
                            </li>
                        }
                        {genres &&
                            <li>
                                <h2>Genres</h2>
                                <p>{genres.reduce((acc, genre) => acc=acc+" "+genre.name, '')}</p>
                            </li>
                        }
                    </ul>
                </div>
            </div>
    )
}

MovieCard.propTypes = {
    movieDetails: PropTypes.object
    
}