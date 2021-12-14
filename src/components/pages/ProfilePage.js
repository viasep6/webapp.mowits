import React, {useEffect, useRef, useState} from 'react';

import ErrorPage from './ErrorPage';
import {withRouter} from 'react-router-dom';
import * as actions from '../../flux/actions/actions';
import {GET_USER_BY_USERNAME, LOGIN_SUCCESS} from '../../util/constants';
import {CircularProgress, FormControl, Grid, InputLabel, Modal, OutlinedInput, Paper} from '@mui/material';
import ListWitComponent from '../components/wits/ListWitComponent';
import Typography from '@mui/material/Typography';
import Image from 'mui-image';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import validUrl from 'valid-url';
import moment from 'moment';

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

function ProfilePage(props) {

    const UserStore = props.stores.userStore;
    const WitStore = props.stores.witStore;

    const defaultProfileImage = require('../../assets/img/defaultprofile.jpg').default;
    const [profileUser, setProfileUser] = useState(
        {witCount: 0, favCount: 0, roarCount: 0, profileImage: defaultProfileImage});
    const [isLoading, setIsLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(
        UserStore.state.loggedInUser?.displayName === props.match.params.displayName);
    const prevProps = usePrevious(props);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    function handleResponse(response) {
        if (response !== null) {
            setProfileUser(response);
            setIsLoading(false);
        }
        checkIfOwnProfile();
    }

    useEffect(() => {
        UserStore.userAddChangeListener(GET_USER_BY_USERNAME, handleResponse);
        UserStore.userAddChangeListener(LOGIN_SUCCESS, () => {
            checkIfOwnProfile();
        });

        return function cleanup() {
            setProfileUser({});
            UserStore.userRemoveChangeListener(GET_USER_BY_USERNAME, handleResponse);
            UserStore.userRemoveChangeListener(LOGIN_SUCCESS, () => {});
        };

        // eslint-disable-next-line
    }, []);

    function checkIfOwnProfile() {
        if (UserStore.state.loggedInUser?.displayName === props.match.params.displayName) {
            if (!isOwnProfile) {
                setIsOwnProfile(true);
            }
        }
    }

    useEffect(() => {
        if (prevProps !== props) {
            if ((props.match.params.displayName && !prevProps) ||
                (props.match.params.displayName !== prevProps?.match.params.displayName)) {
                actions.getUserByUsername(props.match.params.displayName);
                if (UserStore.state.loggedInUser?.displayName === props.match.params.displayName) {
                    if (!isOwnProfile) {
                        setIsOwnProfile(true);
                    }
                }
            }
        }
    }, [props, prevProps, isOwnProfile, UserStore.state.loggedInUser]);

    const [profileImage, setProfileImage] = useState(profileUser.profileImage);
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => {
        setOpen(true);
        setProfileImage(profileUser.profileImage);
    };
    const handleCloseModal = () => {
        setOpen(false);

    };

    const handleProfileImageChange = (e) => {
        if (validUrl.isUri(e.target.value)) {
            setProfileImage(e.target.value);
        } else {
            setProfileImage(profileUser.profileImage);
        }
    };

    const handleSetImage = () => {
        actions.setUserProfileImage(profileImage);
        handleCloseModal();
    };

    return (
        <div>
            {isLoading ? (
                <Grid container justifyContent={'center'}>
                    <CircularProgress size={40}/>
                    <p className="ml-4 my-auto">loading data...</p>
                </Grid>
            ) : (
                profileUser.displayName ? (
                    <Grid>
                        <Grid container sx={{mt: 5, mb: 2}} spacing={0} justifyContent={'center'}>
                            <Grid item xs md={6} sx={{textAlign: 'center'}}>
                                <Paper elevation={2} sx={{pt: 2}}>
                                    <Grid container justifyContent={'center'} sx={{p: 2}}>
                                        <Grid item xs={6} sx={{position: 'relative'}}>
                                            <Image src={profileUser?.profileImage} alt="profile image"
                                                   showLoading={true}
                                                   duration={300} sx={{border: 1}}
                                                   height={'100%'}
                                                   width={'100%'}/>
                                            {
                                                isOwnProfile ? <IconButton sx={{
                                                    m: 0.5,
                                                    bgcolor: 'rgba(0,144,67,0.35)',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                }}
                                                                           onClick={handleOpenModal}>
                                                    <EditOutlinedIcon/>
                                                </IconButton> : <></>
                                            }

                                        </Grid>


                                    </Grid>

                                    <h3 className="m-b-0">{profileUser.displayName}</h3>
                                    <p>Became a true <span style={{color: 'green', fontWeight:'bolder'}}>MoWits</span> believer <span>{moment(profileUser.createdAt).fromNow()}</span></p>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-evenly"
                                        alignItems="baseline"
                                    >
                                        <Grid>
                                            <small>Wits</small>
                                            <h3 className="m-b-0 font-light">{profileUser.witCount
                                                ? profileUser.witCount
                                                : 0}</h3>
                                        </Grid>
                                        <Grid>
                                            <small>Movie Following</small>
                                            <h3 className="m-b-0 font-light">{profileUser.followCount
                                                ? profileUser.followCount
                                                : 0}</h3>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant={'h5'}>Wits by user</Typography>
                            <ListWitComponent witStore={WitStore} authStore={props.stores.authStore} user={profileUser}/>
                        </Grid>
                        <Modal
                            open={open}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box xs sx={{...modalStyle, border: 0}}>
                                <Image src={profileImage ? profileImage : profileUser.profileImage}/>
                                <Typography textAlign={'center'} id="modal-modal-title" variant="h6" component="h2"
                                            sx={{m: 2}}>
                                    Change profile picture
                                </Typography>
                                <FormControl fullWidth sx={{mt: 2}}>
                                    <InputLabel htmlFor="component-outlined">Image Url</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        onChange={handleProfileImageChange}
                                        label="Image Url"
                                    />
                                </FormControl>
                                <Grid container direction={'column'} sx={{mt: 2}}>
                                    <Button variant="contained" sx={{mt: 2}} onClick={handleSetImage}>Set Image</Button>
                                    <Button sx={{mt: 2}} onClick={handleCloseModal}>Close</Button>
                                </Grid>
                                <Typography variant={'caption'}>Change of image may require 'logging in' to take
                                    effect.</Typography>
                            </Box>
                        </Modal>
                    </Grid>

                ) : (
                    <ErrorPage/>
                )

            )}
        </div>
    );

}

export default withRouter(ProfilePage);