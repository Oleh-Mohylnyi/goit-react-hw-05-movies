import { useState, useEffect } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";
import * as movieApi from '../../services/moviesApi/moviesApi';
// import alternativePicture from '../images/cinema-movie.jpg';
import Spinner from "react-loader-spinner";
import GalleryItem from "../../components/GallaryItem/GalleryItem";
import s from './moviesView.module.scss'
import NotFoundView from "../NotFoundView/NotFoundView";

export default function MoviesView() {
    const [inputSearch, setInputSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState(() => {
    return JSON.parse(localStorage.getItem('searchQueryMovies')) ?? ""
  })
    const [foundMovies, setFoundMovies] = useState(() => {
    return JSON.parse(localStorage.getItem('foundMovies')) ?? []
  })
    const [status, setStatus] = useState("idle");
    
    const { url } = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const searchValueURL = new URLSearchParams(location.search).get('search') ?? ""
        
        useEffect(() => {
            if (searchValueURL === searchQuery) {
                setStatus("resolved");
                return
            }
            if (searchValueURL === "" &&  inputSearch ==="") { return }
                setInputSearch("")
                setStatus ("pending");
                searchQuery !== "" && history.push({ ...location, search: `search=${ searchQuery }` });
                
        movieApi.fetchSearch(searchQuery)
        // .then(response => {
        //     if (response.results.length === 0) {
        //         return setStatus("reject")
        //     }
        //     return response})
        .then(response => {
            setStatus("resolved");
            localStorage.setItem('foundMovies', JSON.stringify(response.results));
            localStorage.setItem('searchQueryMovies', JSON.stringify(searchQuery));
            setFoundMovies(response.results);
        })
            .catch(err => setStatus("reject"));
            // eslint-disable-next-line
    }, [searchQuery])

    const handleInput = (e) => {
        setInputSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        if (inputSearch.trim() === "") {
            alert('please enter your request')
            return
        }
        e.preventDefault();
        if (inputSearch.toLowerCase().trim() !== searchQuery) {
            setSearchQuery(inputSearch.toLowerCase().trim()) 
            } else {
            setStatus("resolved");
            history.push({ ...location, search: `search=${ searchQuery }` });
            }
    }

    return (
        <>
        <form className={s.Form}
            onSubmit={handleSubmit}>
                <input  
                    value={inputSearch}
                    onInput={handleInput}
                    type="text">
                </input>
                <button type="submit">Search</button>
                
        </form>
        {(status === 'pending') &&
            <Spinner type="ThreeDots" color="black" />
        }
        <ul className={s.Gallery}>
            {(status === 'resolved') && foundMovies.map(movie =>
                <GalleryItem key={movie.id}
                    movie={movie}
                    location={location}
                    url={url}
                />
            )}
        </ul>
        {(status === 'reject') &&
            <NotFoundView text="Nothing found!"/>
        }
        </>
    )
}