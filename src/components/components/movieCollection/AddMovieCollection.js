import * as React from 'react';
import Button from '@mui/material/Button';
import {CircularProgress, Grid, TextField, Tooltip} from '@mui/material';
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import {UPDATED_USER_COLLECTIONS} from "../../../util/constants";
import * as actions from '../../../flux/actions/actions';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export default function AddMovieCollection(props) {
    const movieStore = props.store
    const [inProgress, setInProgress] = useState(false)
    const [collections, setCollections] = useState([])
    const [error, setError] = React.useState(false);
    const [labelTxt, setLabelTxt] = React.useState('New collection')
    const [helperTxt, setHelperTxt] = useState('')
    const [txtFieldValue, setTxtFieldValue] = useState('')
    const [emptyField, setEmptyField] = useState(true)


    useEffect(() => {
        movieStore.addChangeListener(UPDATED_USER_COLLECTIONS, updateCollections)
        init()

        return function cleanup() {
            movieStore.removeChangeListener(UPDATED_USER_COLLECTIONS, updateCollections)
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

    const addCollection = () => {
        if (txtFieldValue === '') {
            updateError(true, 'A name must be entered!')
        }
        else if (collectionNameExist()) {
            updateError(true, 'Collection name already exists.')
        }
        else {
            setInProgress(true)
            actions.createMovieCollection(txtFieldValue)
        }
    }

    const keyPressed = async (key) => {
        if(key.keyCode === 13) {
            addCollection()
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
            collections.forEach(collection =>  {
                if (collection.name === txtFieldValue) {
                    exists = true
                }
            })
        }
        return exists
    }

    const updateError = (bool, msg = '') => {
        setError(bool)
        setLabelTxt(bool ? 'Error' : 'Required')
        setHelperTxt(msg)
    }

    const init = () => {
        if (!movieStore.requestCollection(UPDATED_USER_COLLECTIONS)) {
            actions.getMovieCollectionsByUserID()
        }
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