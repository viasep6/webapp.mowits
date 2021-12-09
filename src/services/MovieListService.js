import dispatcher from '../flux/dispatcher';
import {CREATE_MOVIE_LIST, GET_MOVIE_LISTS_BY_USER_ID} from "../util/constants";
import * as actions from '../flux/actions/actions';
import {SubstituteSpaces} from '../util/utils'


function MovieListService(apiProvider, movieService) {
    const api = apiProvider
    const movieServ = movieService
    const movieListPath = '/movielists'


    dispatcher.register(action => {
        switch (action.type) {
            case GET_MOVIE_LISTS_BY_USER_ID:
                getListsByUserID(action.payload.accessToken, action.payload.listName)
                break;
            case CREATE_MOVIE_LIST:
                createMovieListByUserID(action.payload.accessToken, action.payload.listName)
                break;
            default:
                break;
        }
    });

    const getListsByUserID = (accessToken, listName='') => api
        .get(`${movieListPath}/Get${listName === '' ? listName : '?list=' + SubstituteSpaces(listName, '%20')}`,
            { Authorization: `Bearer ${accessToken}` })
        .then(res => {
            let lists = []
            if (listName === '') {
                for (const list of Object.keys(res.data)) {
                    lists.push({
                        name: list,
                        movies: res.data[list].movies,
                        updated: res.data[list].updated,
                        created: res.data[list].created
                    })
                }
            }
            else {
                if (typeof res.data.created !== 'undefined') {
                    lists.push({
                        name: listName,
                        movies: res.data.movies,
                        updated: res.data.updated,
                        created: res.data.created
                    })
                }
            }
            return lists
        })
        .then(async data => {
            if (listName === '') {
                if (data.length > 0) {
                    let userLists = []
                    for (const list of data) {
                        let movieList = []
                        for (const movie of list.movies) {
                            await movieServ.getMovieDetails(movie.id)
                                .then(m => movieList.push(m.data))
                        }
                        userLists.push({
                            name: list.name,
                            movies: movieList,
                            created: list.created,
                            updated: list.updated
                        })
                    }
                    actions.newUserMovieLists(userLists)
                }
                else {
                    actions.noListsFound()
                }
            }
            else {
                if (data.length === 1) {
                    actions.requestedMovieList(data[0])
                }
                else {
                    actions.listNotFound()
                }
            }
        })
        .catch(err => console.log('Service Error:', err))

    const createMovieListByUserID = (accessToken, listName, movies=[]) => {
        if (typeof listName !== 'undefined' && listName !== '') {
            api.post(`${movieListPath}/Add`,
                    {
                        name: listName,
                        movies: movies
                    },
                    { Authorization: `Bearer ${accessToken}` })
                .then(getListsByUserID(accessToken))
                .catch(err => console.log('Movie list service API POST error: ', err))
        }
    }

}

export default MovieListService