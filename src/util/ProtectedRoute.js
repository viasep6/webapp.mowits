import {Route, withRouter} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {CHANGE_AUTH_TOKEN} from './constants';

function ProtectedRoute({ component: Component, ...rest }) {

    const [isLoggedIn, setIsLoggedIn] = useState(rest.authStore.state.authUser)

    useEffect(() => {
        rest.authStore.authAddChangeListener(CHANGE_AUTH_TOKEN, handleAuthChanged);
        return function cleanup() {
            rest.authStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, handleAuthChanged);
        };
        // eslint-disable-next-line
    }, [])

    const handleAuthChanged = (state) => {
        if (isLoggedIn !== state) {
            setIsLoggedIn(state)
        }
    }

    return (
        // this route takes other route assigned to it from the App.js and return the same route if condition is met
        <Route
            {...rest}
            render={(props) => {
                if (isLoggedIn) {
                    return <Component {...props} />;
                } else {
                    // return the user to the landing page if there is no valid token set
                    return (
                        <Grid container justifyContent={'center'} sx={{mt:5}}>
                            <Typography>login to see this page</Typography>
                        </Grid>

                    );
                }
            }}
        />
    );
}

export default withRouter(ProtectedRoute);