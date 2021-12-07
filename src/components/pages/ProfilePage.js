import React, {useEffect, useRef, useState} from 'react';

import ErrorPage from './ErrorPage';
import {withRouter} from 'react-router-dom';
import * as actions from '../../flux/actions/actions';
import {GET_USER_BY_USERNAME} from '../../util/constants';
import {CircularProgress, Grid, Paper} from '@mui/material';
import ListWitComponent from '../components/wits/ListWitComponent';
import Typography from '@mui/material/Typography';


function ProfilePage(props) {

    const UserStore = props.stores.userStore;
    const WitStore = props.stores.witStore;


    const defaultProfileImage = require('../../assets/img/defaultprofile.jpg').default;
    const [user, setUser] = useState(
        {witCount: 0, favCount: 0, roarCount: 0, profileImage: defaultProfileImage});
    const [isLoading, setIsLoading] = useState(true);

    const prevProps = usePrevious(props);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    function handleResponse(response) {
        setUser({
            ...response,
        });
        setIsLoading(false);
    }

    useEffect(() => {
        UserStore.userAddChangeListener(GET_USER_BY_USERNAME, handleResponse);

        return function cleanup() {
            setUser({});
            UserStore.userRemoveChangeListener(GET_USER_BY_USERNAME, handleResponse);
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (prevProps !== props) {
            if ((props.match.params.displayName && !prevProps) ||
                (props.match.params.displayName !== prevProps?.match.params.displayName)) {
                actions.getUserByUsername(props.match.params.displayName);
            }
        }
    }, [props, prevProps, user]);

    return (
        <div>
            {isLoading ? (
                <div className="d-flex justify-content-center mx-auto m-5">
                    <CircularProgress size={40}/>
                    <p className="ml-4 my-auto">loading data...</p>
                </div>
            ) : (
                user.displayName ? (

                    <Grid>
                        <Grid container sx={{mt: 5, mb: 2}} spacing={0} justifyContent={'center'}>
                            <Grid item xs md={6} sx={{textAlign: 'center'}}>
                                <Paper elevation={2} sx={{pt: 2}}>
                                    <img src={user.profileImage}
                                         className="rounded-circle" alt="user"/>
                                    <h3 className="m-b-0">{user.displayName}</h3>
                                    <p>Joined MoWits {new Date(user.createdAt).toLocaleDateString()}</p>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-evenly"
                                        alignItems="baseline"
                                    >
                                        <Grid>
                                            <small>Wits</small>
                                            <h3 className="m-b-0 font-light">0</h3>
                                        </Grid>
                                        <Grid>
                                            <small>Favorites</small>
                                            <h3 className="m-b-0 font-light">0</h3>
                                        </Grid>
                                        <Grid>
                                            <small>Roars</small>
                                            <h3 className="m-b-0 font-light">0</h3>
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
                            <ListWitComponent witStore={WitStore} authStore={props.stores.authStore} getByUser={user}/>
                        </Grid>
                    </Grid>

                ) : (
                    <ErrorPage/>
                )

            )}
        </div>
    );

}

export default withRouter(ProfilePage);