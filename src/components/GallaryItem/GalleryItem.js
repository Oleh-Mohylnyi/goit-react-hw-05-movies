import { IoIosStarHalf } from 'react-icons/io';
import { Link } from "react-router-dom";
import alternativePicture from '../../images/cinema-movie.jpg';
import s from './galleryItem.module.scss';

export default function GalleryItem({ movie, location }) {
    const { id, poster_path, original_title, vote_average } = movie;

    function backBtnText () {
        if (location.pathname === "/") {return "Home"};
        if (location.pathname === "/movies") {return "Movies"};
    }

    return (
        <li className={s.Item}>
            <Link
                className={s.Link}
                to={{
                    pathname: `movies/${id}`,
                    state: {
                        from: { location, label: `back to ${backBtnText()}` }
                    },
                }}>
                <img alt=""
                    className={s.Image}
                    width="200px" 
                    src={poster_path
                        ?`https://image.tmdb.org/t/p/w300${poster_path}`
                        :alternativePicture}>
                </img>
                <p className={s.Title}>
                    {original_title}
                </p>
            </Link>
            {vote_average !== 0 &&
                <p className={s.Average}>
                <IoIosStarHalf />
                {vote_average}
                </p>
            }
        </li>
    )
}