import {auth} from './providers/Firebase';
import {getResponseObject} from '../util/ServiceResponse';
import {ERROR, SUCCESS} from '../util/constants';

function MovieService(apiProvider) {
    const api = apiProvider
    const moviesPath = '/movies'

    const getMovieDetails = (movieId) => {
        let userId = undefined;
        if (auth.currentUser?.accessToken) {
            userId = auth.currentUser.uid;
        }
        return api.get(`${moviesPath}/MovieDetails`,
                {},
                {
                    movieid: movieId,
                    userId: userId
                }
            )
            .then(res => getResponseObject(SUCCESS, res.data))
            .catch(error => getResponseObject(ERROR, { errorMsg: error }))
    }

    const getMoviesByCollectionType = (collectionPath, movieId = '') => {
        const params = movieId === '' ? {} : { movieid: movieId }
        return apiProvider.get(`${moviesPath}/${collectionPath}`, {}, params)
            .then(res => getResponseObject(SUCCESS, res.data))
            .catch(error => getResponseObject(ERROR, { errorMsg: error }))
    }

    const followMovie = (movieId, movieTitle) => api.post(`${moviesPath}/Follow`,
            {
                movieId: movieId,
                title: movieTitle,
            },
            { Authorization: `Bearer ${auth.currentUser?.accessToken}` })
            .catch(error => console.log('Movie Service Follow Error:', error))

    const getSearchResults = (query) => {
        const params = { query: query}
        return apiProvider.get(`${moviesPath}/MovieSearch`, {}, params)
            .then(res => getResponseObject(SUCCESS, res.data))
            .catch(error => getResponseObject(ERROR, { errorMsg: error }))
    }

    const movieCollectionTypes = {
        POPULAR: 'Popular',
        UPCOMING: 'Upcoming',
        TOP_RATED: 'TopRated',
        NOW_PLAYING: 'NowPlaying',
        SIMILAR_MOVIES: 'Similar'
    }

    return { getMovieDetails, getMoviesByCollectionType, followMovie, getSearchResults, movieCollectionTypes }
}

export default MovieService