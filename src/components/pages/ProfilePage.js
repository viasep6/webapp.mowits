import React, {useEffect, useRef, useState} from 'react';

import ErrorPage from './ErrorPage';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withRouter} from 'react-router-dom';
import * as actions from '../../flux/actions/actions';
import {GET_USER_BY_USERNAME} from '../../util/constants';

function ProfilePage(props) {

    const UserStore = props.stores.userStore;
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
            profileImage: require('../../assets/img/defaultprofile.jpg').default,
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
                user ? (
                    <div className="m-5">
                        <div className="padding">
                            <div className="offset-md-2 col-md-8">
                                <div className="card">
                                    <div className="card-body little-profile text-center">
                                        <div>
                                            <img src={user.profileImage}
                                                 className="rounded-circle" alt="user"/>
                                        </div>
                                        <h3 className="m-b-0">{user.displayName}</h3>
                                        <p>Joined MoWits {new Date(user.createdAt).toLocaleDateString()}</p>
                                        <div className="row text-center m-t-20">
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h3 className="m-b-0 font-light">{user.witCount}</h3>
                                                <small>Wits</small>
                                            </div>
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h3 className="m-b-0 font-light">{user.favCount}</h3>
                                                <small>Favorites</small>
                                            </div>
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h3 className="m-b-0 font-light">{user.roarCount}</h3>
                                                <small>Roars</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ErrorPage/>
                )

            )}
        </div>
    );

}

export default withRouter(ProfilePage);