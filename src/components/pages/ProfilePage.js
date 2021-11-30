import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {URL_GET_USER} from '../../util/constants';
import ErrorPage from './ErrorPage';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProfilePage(props) {

    const [user, setUser] = useState({witCount: 0, favCount: 0, roarCount: 0});
    const [isLoading, setIsLoading] = useState(true);

    const prevProps = usePrevious(props)

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    useEffect( () => {
        if (prevProps !== props) {
            if ((props.match.params.displayName && !prevProps) || (props.match.params.displayName !== prevProps?.match.params.displayName)) {
                axios.get(URL_GET_USER + `?user=${props.match.params.displayName}`)
                    .then((response) => {
                        setIsLoading(false);
                        setUser({...user, ...response.data});
                    })
                    .catch((error) => {
                        setIsLoading(false);
                    });
            }
        }
    }, [props, prevProps, user])


    return (
        <div>
            {isLoading ? (<div className="d-flex justify-content-center mx-auto m-5">
                    <CircularProgress size={40}/>
                    <p className="ml-4 my-auto">loading data...</p>
                </div>
            ) : (
                user.displayName !== undefined ? (
                    <div className="m-5">
                        <div className="padding">
                            <div className="offset-2 col-md-8">
                                <div className="card">
                                    <div className="card-body little-profile text-center">
                                        <div className="pro-img"><img src={user.profileImage}
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

export default ProfilePage;