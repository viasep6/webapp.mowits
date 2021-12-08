
function MovieService(apiProvider) {
    const api = apiProvider

    const getMovieDetails = (movieId) => api
        .get('/movies/MovieDetails',
            {  },
            { movieid: movieId }
        )

    return { getMovieDetails }
}

export default MovieService