import dispatcher from '../flux/dispatcher';
import {GET_MOVIE_LISTS_BY_USER_ID} from "../util/constants";
import * as actions from '../flux/actions/actions';


function MovieListService(apiProvider, movieService) {
    const api = apiProvider
    const movieServ = movieService

    dispatcher.register(action => {
        switch (action.type) {
            case GET_MOVIE_LISTS_BY_USER_ID:
                getListsByUserID(action.payload)
                break;
            default:
                break;
        }
    });

    const getListsByUserID = (accessToken) => getMovieLists(accessToken)
        .then(res => {
            let lists = []
            for (const list of Object.keys(res.data)) {
                lists.push({
                    name: list,
                    movies: res.data[list].movies,
                    updated: res.data[list].updated,
                    created: res.data[list].created
                })
            }
            return lists
        })
        .then(async data => {
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
        })
        .catch(err => console.log('Service Error:', err))

    const getMovieLists = (accessToken, listName='') => api
        .get('/movielists/Get',
            { Authorization: `Bearer ${accessToken}` },
            listName === '' ? {} : { list: listName }
        )

    return { getMovieLists }
}

export default MovieListService