import {withRouter} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import HorizontalMovieCollection from "../components/movieCollection/HorizontalMovieCollection";
import {CHANGE_AUTH_TOKEN, NEW_USER_MOVIE_COLLECTIONS} from '../../util/constants';
import * as actions from '../../flux/actions/actions';
import {CircularProgress, Grid} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddMovieCollection from "../components/movieCollection/AddMovieCollection";

function FavoritesPage(props) {
    const [accessToken, setAccessToken] = useState(props.stores.authStore.state.authUser.accessToken)

    const [movieCollections, setMovieCollections] = useState(async () => {
        await actions.getMovieCollectionsByUserID(accessToken)
        return []
    })

    const [dataReady, setReady] = useState(false)
    const [addDone, setAddDone] = useState(true)
    const [enableDelete, setEnableDelete] = useState(false)

    useEffect(() => {
        props.stores.authStore.authAddChangeListener(CHANGE_AUTH_TOKEN, updateToken)
        props.stores.favoritesStore.addChangeListener(NEW_USER_MOVIE_COLLECTIONS, updateCollections)


        return function cleanup() {
            props.stores.authStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, updateToken);
            props.stores.favoritesStore.removeChangeListener(NEW_USER_MOVIE_COLLECTIONS, updateCollections)
        };
    });

    const updateToken = (decodedToken) => setAccessToken(decodedToken.accessToken)

    const updateCollections = (collections) => {
        if (typeof collections === 'undefined' || collections.length === 0) {

            setMovieCollections([{name: 'You don´t have any collections yet...'}])
        }
        else {
            setEnableDelete(true)
            setMovieCollections(collections)
        }
        setReady(true)
    }

    const goToMovie = (movieId) => props.history.push('/movie/' + movieId )
    const deleteItem = (collectionName, movieId) => actions.deleteMovieFromCollection(accessToken, collectionName, movieId)
    const roarClicked = (movieId) => console.log(movieId)
    const deleteCollection = (collectionName) => actions.deleteMovieCollection(accessToken, collectionName)

    const collectionAdded = () => {
        setAddDone(true)
    }

    const toggleAddCollection = () => setAddDone(!addDone)

    return (
        <Grid
            item
            xs
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            marginTop={5}
        >
            <Accordion
                expanded={!addDone}>
                <AccordionSummary
                    onClick={() => toggleAddCollection()}
                    expandIcon={<ExpandMoreIcon sx={{mt: 2, borderRadius: 1}} />}
                >
                    <Typography mx={'auto'} variant={'h5'}>My Amazing Mowit Collections</Typography>
                </AccordionSummary>
                <Box
                marginBottom={2}>
                    <AddMovieCollection
                        token={accessToken}
                        favoritesStore={props.stores.favoritesStore}
                        existingCollections={movieCollections}
                        onDone={collectionAdded}
                    />
                </Box>
            </Accordion>
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
                        movieCollections.map(collection => <HorizontalMovieCollection
                            key={collection.name}
                            title={collection.name}
                            movieCollection={collection.movies}
                            enableDelete={enableDelete}
                            disableRoars={true}
                            onMovieClicked={goToMovie}
                            onDeleteItem={deleteItem}
                            onDeleteCollection={deleteCollection}
                            onRoarClicked={roarClicked}
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