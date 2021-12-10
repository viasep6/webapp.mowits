import dispatcher from '../flux/dispatcher';
import {CREATE_MOVIE_COLLECTION, GET_MOVIE_COLLECTIONS_BY_USER_ID} from "../util/constants";
import * as actions from '../flux/actions/actions';
import {SubstituteSpaces} from '../util/utils'


function MovieCollectionService(apiProvider, movieService) {
    const api = apiProvider
    const movieServ = movieService
    const movieCollectionPath = '/movielists'


    dispatcher.register(action => {
        switch (action.type) {
            case GET_MOVIE_COLLECTIONS_BY_USER_ID:
                getCollectionsByUserID(action.payload.accessToken, action.payload.collectionName)
                break;
            case CREATE_MOVIE_COLLECTION:
                createMovieCollectionByUserID(action.payload.accessToken, action.payload.collectionName)
                break;
            default:
                break;
        }
    });

    const getCollectionsByUserID = (accessToken, collectionName='') => api
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
            if (collectionName === '') {
                if (data.length > 0) {
                    let userCollections = []
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
                    actions.newUserMovieCollections(userCollections)
                }
                else {
                    actions.noCollectionsFound()
                }
            }
            else {
                if (data.length === 1) {
                    actions.requestedMovieCollection(data[0])
                }
                else {
                    actions.collectionNotFound()
                }
            }
        })
        .catch(err => console.log('Service Error:', err))

    const createMovieCollectionByUserID = (accessToken, collectionName, movies=[]) => {
        if (typeof collectionName !== 'undefined' && collectionName !== '') {
            api.post(`${movieCollectionPath}/Add`,
                    {
                        name: collectionName,
                        movies: movies
                    },
                    { Authorization: `Bearer ${accessToken}` })
                .then(getCollectionsByUserID(accessToken))
                .catch(err => console.log('Movie collection service API POST error: ', err))
        }
    }

}

export default MovieCollectionService