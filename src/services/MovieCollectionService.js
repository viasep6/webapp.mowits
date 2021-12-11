import {SubstituteSpaces} from '../util/utils'

function MovieCollectionService(apiProvider, movieService) {
    const api = apiProvider
    const movieServ = movieService
    const movieCollectionPath = '/movielists'

    const getCollectionsByUserID = async (accessToken, collectionName='') => await api
        .get(`${movieCollectionPath}/Get${collectionName === '' ? collectionName : '?list=' + SubstituteSpaces(collectionName, '%20')}`,
            { Authorization: `Bearer ${accessToken}` })
        .then(res => {
            let collections = []
            if (collectionName === '') {
                for (const collection of Object.keys(res.data)) {
                    collections.push({
                        name: collection,
                        movies: res.data[collection].movies,
                        updated: res.data[collection].updated,
                        created: res.data[collection].created
                    })
                }
            }
            else {
                if (typeof res.data.created !== 'undefined') {
                    collections.push({
                        name: collectionName,
                        movies: res.data.movies,
                        updated: res.data.updated,
                        created: res.data.created
                    })
                }
            }
            return collections
        })
        .then(async data => {
            let userCollections = []
            if (data.length > 0) {
                for (const collection of data) {
                    let movieCollection = []
                    for (const movie of collection.movies) {
                        await movieServ.getMovieDetails(movie.id)
                            .then(m => movieCollection.push(m.data))
                    }
                    userCollections.push({
                        name: collection.name,
                        movies: movieCollection,
                        created: collection.created,
                        updated: collection.updated
                    })
                }
            }
            return userCollections
        })
        .catch(err => console.log('Service Error:', err))

    const createMovieCollectionByUserID = async (accessToken, collectionName, movies=[]) => {
        if (typeof collectionName !== 'undefined' && collectionName !== '') {
            return await api.post(`${movieCollectionPath}/Add`,
                    {
                        name: collectionName,
                        movies: movies
                    },
                    { Authorization: `Bearer ${accessToken}` })
                 .then(() => getCollectionsByUserID(accessToken))
                .catch(err => {
                    console.log('Movie collection service API POST error: ', err)
                })
        }
    }

    const deleteMovieCollection = async (accessToken, collectionName) => {
        console.log('service' + collectionName)
    }

    const deleteMovieFromCollection = async (accessToken, collectionName, movieId) => {
        console.log('service' + collectionName + ' ' + movieId)
    }

    return { getCollectionsByUserID, createMovieCollectionByUserID, deleteMovieCollection, deleteMovieFromCollection }

}

export default MovieCollectionService