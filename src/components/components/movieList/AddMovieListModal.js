import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {CircularProgress, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {LIST_NOT_FOUND, NEW_USER_MOVIE_LISTS, USER_MOVIE_LIST} from "../../../util/constants";
import * as actions from '../../../flux/actions/actions';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function AddMovieListModal(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [labelTxt, setLabelTxt] = React.useState('Required')
    const [helperTxt, setHelperTxt] = useState('')
    const [txtFieldValue, setTxtFieldValue] = useState('')
    const [gotResponse, setResponse] = useState(false)
    const [inProgress, setInProgress] = useState(false)

    useEffect(() => {
        props.stores.favoritesStore.addChangeListener(USER_MOVIE_LIST, checkResponse)
        props.stores.favoritesStore.addChangeListener(LIST_NOT_FOUND, checkResponse)
        props.stores.favoritesStore.addChangeListener(NEW_USER_MOVIE_LISTS, handleClose)

        return function cleanup() {
            props.stores.favoritesStore.removeChangeListener(USER_MOVIE_LIST, checkResponse)
            props.stores.favoritesStore.removeChangeListener(LIST_NOT_FOUND, checkResponse)
            props.stores.favoritesStore.removeChangeListener(NEW_USER_MOVIE_LISTS, handleClose)
        };
    });

    useEffect(() => {
        actions.createMovieList(props.token, txtFieldValue)
        setResponse(false)
        setInProgress(false)
    }, [gotResponse]);

    const handleOpen = () => setOpen(true);
    const handleClose = (lists) => {
        setTxtFieldValue('')
        setHelperTxt('')
        if (typeof props.onNewLists !== 'undefined'){
            props.onNewLists(lists)
        }
        setOpen(false);
    }

    const addList = () => {
        if (txtFieldValue === '') {
            updateError(true, 'A name must be entered!')
        }
        else {
            setInProgress(true)
            actions.getMovieListsByUserID(props.token, txtFieldValue)
        }
    }

    const keyPressed = (key) => {
        if(key.keyCode === 13) {
            addList()
        }
    }

    const txtFieldUpdated = (val) => {
        setTxtFieldValue(val)
        setHelperTxt('Please enter a list name.')
        if (error) {
            updateError(false, 'Please enter a list name.')
        }
    }

    const checkResponse = (list) => {
        if (typeof list === 'undefined') {
            setResponse(true)
        }
        else {
            updateError(true, 'You already have a list: ' + list.name)
            setInProgress(false)
        }
    }

    const updateError = (bool, msg = '') => {
        setError(bool)
        setLabelTxt(bool ? 'Error' : 'Required')
        setHelperTxt(msg)
    }

    return (
        <Box
            margin={props.margin}
        >
            <Button size="small" onClick={handleOpen}>Add List</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <Grid
                            item
                            xs={12}
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
                                placeholder='List Name'
                                value={txtFieldValue}
                                onChange={(event) => {txtFieldUpdated(event.target.value)}}
                                onKeyDown={keyPressed}
                                helperText={helperTxt}
                            />
                            <Button variant="text" onClick={addList}>Add</Button>
                            <Box
                                visibility={ inProgress ? 'visible' : 'hidden'}
                            >
                                <CircularProgress/>
                            </Box>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}