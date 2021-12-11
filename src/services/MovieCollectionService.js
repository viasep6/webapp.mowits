import {SubstituteSpaces} from '../util/utils'

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

    const getMovieDetails = async (data) => {
        let userCollections = []
        if (data.length > 0) {
            for (const collection of data) {
                let movieCollection = []
                for (const movie of collection.movies) {
                    await movieService.getMovieDetails(movie.id)
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
    }

    return { getCollectionsByUserID, updateMovieCollectionByUserID, deleteMovieCollection }

}

export default MovieCollectionService