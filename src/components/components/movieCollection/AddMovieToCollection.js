import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {CircularProgress, Grid} from '@mui/material';
import {useEffect, useState} from "react";
import { UPDATED_USER_COLLECTIONS} from '../../../util/constants';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {getStorageItemFromDisplayItem, getNewStorageItem} from '../../../util/movieCollectionConverter';

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
    const movieStore = props.store
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(true)
    const [labelTxt, setLabelTxt] = React.useState('')
    const [options, setOptions] = useState([])
    const [collectionSelected, setCollectionSelected] = useState(false)
    const [currentSelected, setCurrentSelected] = useState('')
    const [dataReady, setDataReady] = useState(false)
    const [addCollectionDone, setAddCollectionDone] = useState(true)
    const [idPresent, setIdPresent] = useState(false)
    const [saving, setSaving] = useState(false)
    const [progressMsg, setProgressMsg] = useState('Loading your collections...')

    useEffect(() => {
        movieStore.addChangeListener(UPDATED_USER_COLLECTIONS, updateOptions)

        return function cleanup() {
            movieStore.removeChangeListener(UPDATED_USER_COLLECTIONS, updateOptions)
        };
    });

    const handleOpen = async () => {
        setLabelTxt(props.movieTitle)
        setLoading(true)
        setOpen(true);
        if (!movieStore.requestCollection(UPDATED_USER_COLLECTIONS)) {
            actions.getMovieCollectionsByUserID()
        }
    }

    const handleClose = () => {
        setCurrentSelected('')
        setLabelTxt('')
        setCollectionSelected(false)
        setDataReady(false)
        setSaving(false)
        setProgressMsg('Loading your collections...')
        setOpen(false);
    }

    const addMovie = () => {
        const currentMovies = currentSelected.movies
        if (inCollection(currentMovies)) {
            setIdPresent(true)
            setLabelTxt('Movie already in collection!')
        }
        else {
            setProgressMsg('Saving to your collection...')
            setSaving(true)
            const updatedMovies = currentMovies.map(movie => getStorageItemFromDisplayItem(movie))
            updatedMovies.push(getNewStorageItem(props.movieId))
            actions.updateMovieCollection(currentSelected.name, updatedMovies)
            handleClose()
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
            setLoading(false)
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
                        {
                            saving || loading
                                ? <Grid  item
                                         xs
                                         container
                                         direction="row"
                                         justifyContent="center"
                                         alignItems="center"
                                         padding={2}
                                         >
                                    <Typography mx={'auto'} variant={'p'}>
                                        {progressMsg}
                                    </Typography>
                                    <CircularProgress />
                                </Grid>
                                : <Accordion
                                    expanded={!addCollectionDone}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{mt: 15, borderRadius: 0,}}
                                                                    onClick={() => toggleAddCollection()} />}
                                    >
                                        <Grid
                                            item
                                            xs
                                            container
                                            direction="column"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography mx={'auto'} variant={'p'} marginBottom={2}>
                                                Mowit Collections
                                            </Typography>
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
                                                            ? options.map(option => <MenuItem
                                                                key={option.name}
                                                                value={option}>
                                                                {option.name}
                                                            </MenuItem>)
                                                            : <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                    }
                                                </Select>
                                                <Box
                                                    marginTop={1}
                                                >
                                                    <Button
                                                        size="small"
                                                        variant="text"
                                                        color={'primary'}
                                                        disabled={!collectionSelected}
                                                        onClick={addMovie}
                                                        startIcon={<AddCircleOutlineIcon />}
                                                    >
                                                        Add to collection
                                                    </Button>
                                                </Box>
                                            </FormControl>
                                        </Grid>
                                    </AccordionSummary>
                                    <Box marginLeft={1}>
                                        <AddMovieCollection
                                            store={movieStore}
                                            onDone={updateOptions}
                                        />
                                    </Box>
                                </Accordion>
                        }

                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}