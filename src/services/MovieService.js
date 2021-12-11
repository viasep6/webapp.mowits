

function MovieService(apiProvider) {
    const api = apiProvider
    const moviesPath = '/movies'

    const getMovieDetails = (movieId) => api
        .get(`${moviesPath}/MovieDetails?movieid=${movieId}`
        )

    return { getMovieDetails }
}

export default MovieService