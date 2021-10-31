const KEY = "9b5febc096912e8933f83f306c054db0";
const URL = "https://api.themoviedb.org/3";

async function fetchMovies(mainQueryString, otherQueryString="") {

    const response = await fetch(
        `${URL}${mainQueryString}?api_key=${KEY}${otherQueryString}`
    )
    return response.ok
        ? await response.json()
        : Promise.reject(new Error('Not found'))
}

export function fetchTrending() {
    return fetchMovies('/trending/movie/week')
}

export function fetchSearch(searchQuery) {
    return fetchMovies(`/search/movie`, `&query=${searchQuery}`)
}

export function fetchDetails(movieId) {
    return fetchMovies(`/movie/${movieId}`)
}

export function fetchCast(movieId) {
    return fetchMovies(`/movie/${movieId}/credits`)
}

export function fetchReviews(movieId) {
    return fetchMovies(`/movie/${movieId}/reviews`)
}
