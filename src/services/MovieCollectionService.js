import {SubstituteSpaces} from '../util/utils'
import {getDisplayItemFromResult} from '../util/movieCollectionConverter';

function MovieCollectionService(apiProvider, MovieService) {
    const api = apiProvider
    const movieService = MovieService
    const movieCollectionPath = '/movielists'

    const getCollectionsByUserID = async (accessToken, collectionName='') => await api
        .get(`${movieCollectionPath}/Get${collectionName === '' ? collectionName : '?list=' + SubstituteSpaces(collectionName, '%20')}`,
            { Authorization: `Bearer ${accessToken}` })
        .then(result => convertResultToList(result))
        .then(async data => await getMovieDetails(data))
        .catch(err => {
            console.log('Movie collection service API GET error: ', err)
        })

    const updateMovieCollectionByUserID = async (accessToken, collectionName, movies=[]) => {
        if (typeof collectionName !== 'undefined' && collectionName !== '') {
            return await api.post(`${movieCollectionPath}/Add`,
                    {
                        name: collectionName,
                        movies: movies
                    },
                    { Authorization: `Bearer ${accessToken}` })
                .then(result => convertResultToList(result))
                .then(async data => await getMovieDetails(data))
                .catch(err => {
                    console.log('Movie collection service API POST error: ', err)
                })
        }
    }

    const deleteMovieCollection = async (accessToken, collectionName) => await api
        .del(`${movieCollectionPath}/delete?list=${SubstituteSpaces(collectionName, '%20')}`,
            { Authorization: `Bearer ${accessToken}` }
        )
        .then(result => convertResultToList(result))
        .then(async data => await getMovieDetails(data))
        .catch(err => {
            console.log('Movie collection service API Delete error: ', err)
        })

    const convertResultToList = (result) => {
        let collections = []
        for (const collection of Object.keys(result.data)) {
            collections.push({
                name: collection,
                movies: result.data[collection].movies,
                updated: result.data[collection].updated,
                created: result.data[collection].created
            })
        }

        return collections
    }

    const getMovieDetails = async (storedCollections) => {
        let detailedCollections = []
        if (storedCollections.length > 0) {
            for (const storedCollection of storedCollections) {
                let detailedCollection = []
                for (const storedMovie of storedCollection.movies) {
                    await movieService.getMovieDetails(storedMovie.id)
                        .then(movieDetails => detailedCollection.push(getDisplayItemFromResult(storedMovie, movieDetails))
                        )
                }
                detailedCollections.push({
                    name: storedCollection.name,
                    movies: detailedCollection,
                    created: storedCollection.created,
                    updated: storedCollection.updated
                })
            }
        }
        return detailedCollections
    }

    return { getCollectionsByUserID, updateMovieCollectionByUserID, deleteMovieCollection }

}

export default MovieCollectionService