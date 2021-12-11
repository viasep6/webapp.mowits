import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import {useEffect, useState} from "react";
import { NEW_USER_MOVIE_COLLECTIONS} from '../../../util/constants';
import * as actions from '../../../flux/actions/actions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddMovieCollection from './AddMovieCollection';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';

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
    const [labelTxt, setLabelTxt] = React.useState('')
    const [options, setOptions] = useState([])
    const [collectionSelected, setCollectionSelected] = useState(false)
    const [currentSelected, setCurrentSelected] = useState('')
    const [dataReady, setDataReady] = useState(false)
    const [addCollectionDone, setAddCollectionDone] = useState(true)
    const [idPresent, setIdPresent] = useState(false)

    useEffect(() => {
        props.favoritesStore.addChangeListener(NEW_USER_MOVIE_COLLECTIONS, updateOptions)

        return function cleanup() {
            props.favoritesStore.removeChangeListener(NEW_USER_MOVIE_COLLECTIONS, updateOptions)
        };
    });

    const handleOpen = async () => {
        setLabelTxt(props.movieTitle)
        await actions.getMovieCollectionsByUserID(props.accessToken)
        setOpen(true);
    }

    const handleClose = () => {
        setCurrentSelected('')
        setLabelTxt('')
        setCollectionSelected(false)
        setDataReady(false)
        setOpen(false);
    }

    const addMovie = async () => {
        const movies = currentSelected.movies
        if (inCollection(movies)) {
            setIdPresent(true)
            setLabelTxt('Movie already in collection!')
        }
        else {
            movies.push({ id: props.movieId })
            await actions.addMovieToCollection(props.accessToken, currentSelected.name, movies)
                .then(() => handleClose())
        }
    }

    const inCollection = (movies) => {
        let inCollection = false
        movies.forEach(movie => {
            if (parseInt(movie.id) === parseInt(props.movieId)) {
                inCollection = true
            }
        })
        return inCollection
    }

    const updateOptions = (collections) => {
        if (typeof collections === 'undefined' || collections.length === 0) {
            toggleAddCollection()
        }
        else {
            setOptions(collections)
            setDataReady(true)
        }
    }

    const selectedChanged = (selected) =>{
        setIdPresent(false)
        setLabelTxt(props.movieTitle)
        setCurrentSelected(selected)
        setCollectionSelected(true)
    }

    const toggleAddCollection = () => setAddCollectionDone(!addCollectionDone)

    return (
        <Box>
            <Button disabled={props.disabled} size="small" onClick={handleOpen}>Add To Collection</Button>
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
                        <Accordion
                            expanded={!addCollectionDone}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{mt: 2, borderRadius: 0,}} onClick={() => toggleAddCollection()} />}
                            >
                                <Grid
                                    item
                                    xs
                                    container
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <FormControl
                                        fullWidth>
                                        <InputLabel id="demo-simple-select-label">{labelTxt}</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            error={idPresent}
                                            id="select"
                                            value={currentSelected}
                                            label={labelTxt}
                                            onChange={(event) => {selectedChanged(event.target.value)}}
                                        >
                                            {
                                                dataReady
                                                    ? options.map(option => <MenuItem key={option.name} value={option}>{option.name}</MenuItem>)
                                                    : <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                            }
                                        </Select>
                                    </FormControl>
                                    <Box
                                        margin={1}
                                        marginBottom={2}
                                        visibility={collectionSelected ? 'visible' :'hidden'}
                                    >
                                        <Button size="small" variant="text" onClick={addMovie}>Add Movie</Button>
                                    </Box>
                                    <Typography mx={'auto'} variant={'p'}>Add Collection</Typography>
                                </Grid>
                            </AccordionSummary>
                            <Box marginLeft={1}>
                                <AddMovieCollection
                                    token={props.accessToken}
                                    favoritesStore={props.favoritesStore}
                                    existingCollections={options}
                                    onDone={updateOptions}
                                />
                            </Box>
                        </Accordion>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}