import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {CircularProgress, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {NO_LISTS_FOUND, NEW_USER_MOVIE_LISTS} from "../../../util/constants";
import * as actions from '../../../flux/actions/actions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddMovieListModal from "./AddMovieListModal";

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


export default function AddMovieToCollection(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [labelTxt, setLabelTxt] = React.useState('Required')
    const [helperTxt, setHelperTxt] = useState('')
    const [options, setOptions] = useState(() => {
        actions.getMovieListsByUserID(props.accessToken)
        return ''
    })
    const [current, setCurrent] = useState('')


    useEffect(() => {
        props.stores.favoritesStore.addChangeListener(NO_LISTS_FOUND, updateOptions)
        props.stores.favoritesStore.addChangeListener(NEW_USER_MOVIE_LISTS, updateOptions)

        return function cleanup() {
            props.stores.favoritesStore.removeChangeListener(NO_LISTS_FOUND, updateOptions)
            props.stores.favoritesStore.removeChangeListener(NEW_USER_MOVIE_LISTS, updateOptions)
        };
    });


    const handleOpen = () => setOpen(true);

    const handleClose = (lists) => {
        setOptions('')
        setHelperTxt('')
        setOpen(false);
    }

    const addMovie = () => {

    }

    const keyPressed = (key) => {
        if(key.keyCode === 13) {
            addMovie()
        }
    }

    const updateOptions = (val) => {
        setOptions(val)
    }

    const updateCurrent = (val) => {

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
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <FormControl sx={{ m: 1, minWidth: '75%' }}>
                                <InputLabel>Movie Lists</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="select-helper"
                                    value={current}
                                    label="Movie Lists"
                                    onChange={updateCurrent}
                                >
                                    ½<MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid
                                item
                                xs={12}
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                paddingLeft={3}
                                paddingRight={3}
                            >
                                <AddMovieListModal stores={props.stores} token={props.token}/>
                                <Button size="small" variant="text" onClick={addMovie}>Add Movie</Button>
                            </Grid>

                            {/*<Box*/}
                            {/*    visibility={ inProgress ? 'visible' : 'hidden'}*/}
                            {/*>*/}
                            {/*    <CircularProgress/>*/}
                            {/*</Box>*/}
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}