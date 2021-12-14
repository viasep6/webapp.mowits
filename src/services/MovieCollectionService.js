import {SubstituteSpaces} from '../util/utils'
import {getDisplayItemFromResult} from '../util/movieCollectionConverter';
import {auth} from './providers/Firebase';

function MovieCollectionService(apiProvider, MovieService) {
    const api = apiProvider
    const movieService = MovieService
    const movieCollectionPath = '/movielists'

    const getCollectionsByUserID = (collectionName='') => api
        .get(`${movieCollectionPath}/Get`,
            { Authorization: `Bearer ${auth.currentUser?.accessToken}` },
            collectionName === '' ? { } : { list: SubstituteSpaces(collectionName, '%20')})
        .then(result => convertResultToList(result))
        .then(data => getCollectionsMovieDetails(data))
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                switch (error.response.status) {
                    case 403:
                        console.log(error.response)
                        break
                    case 404:
                        return []
                    default:
                        console.log('Unable to complete the request at the moment')
                        break
                }
            } else if (error.request) {
                console.log('Unable to connect to the server')
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
            } else {
                console.log('Unknown error.')
                // Something happened in setting up the request that triggered an Error
            }
        });

    const updateMovieCollectionByUserID = (collectionName, movies=[]) => {
        if (typeof collectionName !== 'undefined' && collectionName !== '') {
            return api.post(`${movieCollectionPath}/Add`,
                    {
                        name: collectionName,
                        movies: movies
                    },
                    { Authorization: `Bearer ${auth.currentUser?.accessToken}` })
                .then(result => convertResultToList(result))
                .then( data => getCollectionsMovieDetails(data))
                .catch(err => {
                    console.log('Movie collection service API POST error: ', err)
                })
        }
    }

    const deleteMovieCollection = (collectionName) =>  api
        .del(`${movieCollectionPath}/delete?list=${SubstituteSpaces(collectionName, '%20')}`,
            { Authorization: `Bearer ${auth.currentUser?.accessToken}` }
        )
        .then(result => convertResultToList(result))
        .then(data => getCollectionsMovieDetails(data))
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

    const getCollectionsMovieDetails = async (storedCollections) => {
        let detailedCollections = []
        if (storedCollections.length > 0) {
            for (const storedCollection of storedCollections) {
                let detailedCollection = []
                for (const storedMovie of storedCollection.movies) {
                     await movieService.getMovieDetails(storedMovie.id)
                        .then(movieDetails =>
                            detailedCollection.push(getDisplayItemFromResult(storedMovie, movieDetails.data))
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