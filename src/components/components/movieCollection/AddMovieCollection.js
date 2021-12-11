import * as React from 'react';
import Button from '@mui/material/Button';
import {CircularProgress, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import {NEW_USER_MOVIE_COLLECTIONS} from "../../../util/constants";
import * as actions from '../../../flux/actions/actions';

export default function AddMovieCollection(props) {
    const [inProgress, setInProgress] = useState(false)
    const [collections, setCollections] = useState(() =>
        props.existingCollections.length > 0
            ? props.existingCollections
            : async () => {
                await actions.getMovieCollectionsByUserID(props.token)
                return []
            }
    )
    const [error, setError] = React.useState(false);
    const [labelTxt, setLabelTxt] = React.useState('Add Collection')
    const [helperTxt, setHelperTxt] = useState('')
    const [txtFieldValue, setTxtFieldValue] = useState('')


    useEffect(() => {
        props.favoritesStore.addChangeListener(NEW_USER_MOVIE_COLLECTIONS, updateCollections)

        return function cleanup() {
            props.favoritesStore.removeChangeListener(NEW_USER_MOVIE_COLLECTIONS, updateCollections)
        };
    });

    const updateCollections = (collections) => {
        if (typeof collections === 'undefined'){
            setCollections([])
        }
        else {
            setCollections(collections)
            if (inProgress) {
                setTxtFieldValue('')
                setHelperTxt('')
                setInProgress(false)
                props.onDone(collections)
            }
        }
    }

    const addCollection =async  () => {
        if (txtFieldValue === '') {
            updateError(true, 'A name must be entered!')
        }
        else
        {
            if (collectionNameExist()) {
                updateError(true, 'Collection name already exists.')
            }
            else {
                setInProgress(true)
                await actions.createMovieCollection(props.token, txtFieldValue)
            }
        }
    }

    const keyPressed = (key) => {
        if(key.keyCode === 13) {
            addCollection()
        }
    }

    const txtFieldUpdated = (val) => {
        setTxtFieldValue(val)
        setHelperTxt('Please enter a collection name.')
        if (error) {
            updateError(false, 'Please enter a collection name.')
        }
    }

    const collectionNameExist = () => {
        let exists = false
        if (collections.length > 0) {
            collections.forEach(collection => exists = collection.name === txtFieldValue)
        }
        return exists
    }

    const updateError = (bool, msg = '') => {
        setError(bool)
        setLabelTxt(bool ? 'Error' : 'Required')
        setHelperTxt(msg)
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid
                item
                xs
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                marginBottom={2}
            >
                <TextField
                    required={!error}
                    error={error}
                    id="listField"
                    label={labelTxt}
                    placeholder='Collection name'
                    value={txtFieldValue}
                    onChange={(event) => {txtFieldUpdated(event.target.value)}}
                    onKeyDown={keyPressed}
                    helperText={helperTxt}
                />
                <Button variant="text" onClick={addCollection}>Add</Button>
                <Box
                    visibility={ inProgress ? 'visible' : 'hidden'}
                >
                    <CircularProgress/>
                </Box>

            </Grid>
        </Grid>
    );
}