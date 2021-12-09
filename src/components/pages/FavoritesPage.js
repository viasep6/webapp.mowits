import {withRouter} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import HorizontalMovieList from "../components/movieList/HorizontalMovieList";
import {CHANGE_AUTH_TOKEN, NEW_USER_MOVIE_LISTS} from '../../util/constants';
import * as actions from '../../flux/actions/actions';
import {CardActions, CircularProgress, Grid} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddMovieListModal from "../components/movieList/AddMovieListModal";




function FavoritesPage(props) {
    const [accessToken, setAccessToken] = useState(props.stores.authStore.state.authUser.accessToken)

    const [movieLists, setMovieLists] = useState(() => {
        actions.getMovieListsByUserID(accessToken)
        return []
    })

    const [dataReady, setReady] = useState(false)

    useEffect(() => {
        props.stores.authStore.authAddChangeListener(CHANGE_AUTH_TOKEN, updateToken)
        props.stores.favoritesStore.addChangeListener(NEW_USER_MOVIE_LISTS, updateFavorites)

        return function cleanup() {
            props.stores.authStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, updateToken);
            props.stores.favoritesStore.removeChangeListener(NEW_USER_MOVIE_LISTS, updateFavorites)
        };
    });

    const updateToken = (decodedToken) => setAccessToken(decodedToken.accessToken)

    const updateFavorites = (lists) => {
        setMovieLists(lists)
        setReady(true)
    }

    const goToMovie = (movieId) => props.history.push('/movie/' + movieId )

    const add = (listTitle) => console.log(listTitle)

    return (
        <Grid
            item
            xs={12}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            marginTop={5}
        >
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign={'center'}>
                        My Amazing Mowits
                    </Typography>
                </CardContent>
                <CardActions>
                    <AddMovieListModal stores={props.stores} token={accessToken} />
                </CardActions>
            </Card>
            <Grid
                item
                xs
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {
                    dataReady ?
                        movieLists.map(list => <HorizontalMovieList
                            key={list.name}
                            title={list.name}
                            movieList={list.movies}
                            onMovieClicked={goToMovie}
                            onAdd={add}
                            addButton={true}
                            enableDelete={true}
                            disableRoars={true}
                            marginTop={2}
                            marginButton={0}/> )
                        : <Box marginTop={5}>
                            <CircularProgress />
                        </Box>
                }
            </Grid>
        </Grid>
    );
}

export default withRouter(FavoritesPage);