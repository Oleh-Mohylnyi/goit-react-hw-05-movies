import PropTypes from 'prop-types'

import s from './gallery.module.scss';
import GalleryItem from "../../components/GallaryItem/GalleryItem";


export default function Gallery({ movies, location }) {
    return (
        <ul className={s.Gallery}>

            {movies.map(movie =>
                <GalleryItem key={movie.id}
                    location={location}
                    movie={movie} />
            )}
        
        </ul>
    )
}

Gallery.propTypes = {
    movie: PropTypes.object,
    location: PropTypes.object
    
}