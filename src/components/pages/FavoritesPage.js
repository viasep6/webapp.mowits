import {withRouter} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import MovieCollection from "../components/movieCollection/MovieCollection";
import {UPDATED_USER_COLLECTIONS} from '../../util/constants';
import * as actions from '../../flux/actions/actions';
import {CircularProgress, Grid} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddMovieCollection from "../components/movieCollection/AddMovieCollection";

function FavoritesPage(props) {
    const movieStore = props.stores.movieStore

    const [movieCollections, setMovieCollections] = useState(() => {
        actions.getMovieCollectionsByUserID()
        return []
    })

    const [dataReady, setReady] = useState(false)
    const [addDone, setAddDone] = useState(false)
    const [enableDelete, setEnableDelete] = useState(false)

    useEffect(() => {
        movieStore.addChangeListener(UPDATED_USER_COLLECTIONS, updateCollections)

        return function cleanup() {
            movieStore.removeChangeListener(UPDATED_USER_COLLECTIONS, updateCollections)
        };
    });

    const updateCollections = (collections) => {
        setReady(false)
        if (typeof collections === 'undefined' || collections.length === 0) {
            setEnableDelete(false)
            setMovieCollections([{
                name: 'You don´t have any collections yet...',
                movies: []
            }])
        }
        else {
            setAddDone(true)
            setEnableDelete(true)
            setMovieCollections(collections)
        }
        setReady(true)
    }

    const goToMovie = (movieId) => props.history.push('/movie/' + movieId )
    const deleteItem = (collectionName, movies) => actions.updateMovieCollection(collectionName, movies)
    const votesClicked = (movieId) => console.log('Votes not implemented!')
    const deleteCollection = (collectionName) => actions.deleteMovieCollection(collectionName)

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
            marginTop={10}
        >
            <Accordion
                expanded={!addDone}>
                <AccordionSummary
                    onClick={() => toggleAddCollection()}
                    expandIcon={<ExpandMoreIcon sx={{mt: 3,  borderRadius: 1}} />}
                >
                    <Typography mx={'auto'} variant={'h5'}>My Amazing Mowit Collections</Typography>
                </AccordionSummary>
                <Box
                marginBottom={2}>
                    <AddMovieCollection
                        store={movieStore}
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
                        movieCollections.map(collection => <MovieCollection
                            key={collection.name}
                            title={collection.name}
                            movieCollection={collection.movies}
                            enableDelete={enableDelete}
                            disableVote={true}
                            onMovieClicked={goToMovie}
                            onDeleteItem={deleteItem}
                            onDeleteCollection={deleteCollection}
                            onVoteClicked={votesClicked}
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