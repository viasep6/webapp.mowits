import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Grid} from '@mui/material';
import {useState} from 'react';

const style = {
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

export default function DeleteModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = () => {
        props.onDelete()
        handleClose()
    }

    return (
        <div>
            <IconButton
                aria-label="delete"
                size="medium"
                sx={{ visibility: props.enableDelete ? 'visible' : 'hidden' }}
                onClick={handleOpen}
            >
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Confirm Deletion!
                    </Typography>
                    <Typography  sx={{ mt: 2 }}>
                        {props.msg}
                    </Typography>
                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 'bold' }} visibility={props.cannotBeUndone ? 'visible' : 'hidden'}>
                        This cannot be undone!
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button variant="outlined" color={'primary'} onClick={handleClose} startIcon={<HighlightOffIcon />}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color={'error'} onClick={handleDelete} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}