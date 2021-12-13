import * as React from 'react';
import Button from '@mui/material/Button';
import {CircularProgress, Grid, TextField, Tooltip} from '@mui/material';
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import {UPDATED_MOVIE_COLLECTIONS} from "../../../util/constants";
import * as actions from '../../../flux/actions/actions';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

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
    const [labelTxt, setLabelTxt] = React.useState('New collection')
    const [helperTxt, setHelperTxt] = useState('')
    const [txtFieldValue, setTxtFieldValue] = useState('')
    const [emptyField, setEmptyField] = useState(true)


    useEffect(() => {
        props.favoritesStore.addChangeListener(UPDATED_MOVIE_COLLECTIONS, updateCollections)

        return function cleanup() {
            props.favoritesStore.removeChangeListener(UPDATED_MOVIE_COLLECTIONS, updateCollections)
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
                props.onDone()
            }
        }
    }

    const addCollection = async  () => {
        if (txtFieldValue === '') {
            updateError(true, 'A name must be entered!')
        }
        else if (collectionNameExist()) {
            updateError(true, 'Collection name already exists.')
        }
        else {
            setInProgress(true)
            await actions.createMovieCollection(props.token, txtFieldValue)
        }
    }

    const keyPressed = async (key) => {
        if(key.keyCode === 13) {
            await addCollection()
        }
    }

    const txtFieldUpdated = (val) => {
        val === '' ? setEmptyField(true) : setEmptyField(false)
        setTxtFieldValue(val)
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
                <Box marginLeft={1}>
                    <Tooltip title={'Now go to a movie and add it to your collection.'} placement={'top'}>
                        <span>
                            <Button variant="text"
                                    color={'primary'}
                                    onClick={addCollection}
                                    disabled={emptyField}
                                    startIcon={<SaveAltIcon />}>
                            Create
                        </Button>
                        </span>
                    </Tooltip>
                </Box>
                <Box
                    visibility={ inProgress ? 'visible' : 'hidden'}
                >
                    <CircularProgress/>
                </Box>

            </Grid>
        </Grid>
    );
}