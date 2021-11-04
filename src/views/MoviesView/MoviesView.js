import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Spinner from "react-loader-spinner";

// import NotFoundView from "../NotFoundView/NotFoundView";
import s from './moviesView.module.scss';
import * as movieApi from '../../services/moviesApi/moviesApi';
import Gallery from "../../components/Gallery/Gallery";

export default function MoviesView() {
    const [inputSearch, setInputSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState(() => {
    return JSON.parse(localStorage.getItem('searchQueryMovies')) ?? ""
  })
    const [foundMovies, setFoundMovies] = useState(() => {
    return JSON.parse(localStorage.getItem('foundMovies')) ?? null
  })
    const [status, setStatus] = useState("idle");
    
    const location = useLocation();
    const history = useHistory();
    const searchValueURL = new URLSearchParams(location.search).get('search') ?? ""
    
    function responseProcessing(response) {
        if (response.results.length === 0) {
            setStatus('reject');
            history.push({ ...location, search: "" });
            return;
        }
            searchQuery !== "" && 
                history.push({ ...location, search: `search=${ searchQuery }` });
            setStatus("resolved");
            localStorage.setItem('foundMovies', JSON.stringify(response.results));
            setFoundMovies(response.results);
    }

    useEffect(() => {

        if (searchValueURL === searchQuery) {
            setStatus("resolved");
            return
        }
            if (searchValueURL === "" && inputSearch === "") {
                setInputSearch("");
                setStatus ("idle");
                return
            }
        
        setStatus("pending");
                
        movieApi.fetchSearch(searchQuery)
        .then(responseProcessing)
        .catch(err => setStatus("reject"));
        
            // eslint-disable-next-line
    }, [searchQuery])

    const handleInput = (e) => {
        setInputSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        if (inputSearch.trim() === "") {
            alert('please enter your request');
            return
        }
        if (inputSearch.toLowerCase().trim() !== searchQuery) {
            setSearchQuery(inputSearch.toLowerCase().trim());
            localStorage.setItem('searchQueryMovies',
                JSON.stringify(inputSearch.toLowerCase().trim()));
        } else {
            setStatus("resolved");
            history.push({ ...location, search: `search=${ searchQuery }` });
        }
        e.preventDefault();
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
        {(status === 'resolved' && foundMovies) && 
            <Gallery status={status}
                    movies={foundMovies}
                    location={location}
            />
        }
        {(status === 'reject') && 
            <h2>{`no results found for request: "${searchQuery}"`}</h2>
            // <NotFoundView text="Nothing found!"/>
        }
        </>
    )
}