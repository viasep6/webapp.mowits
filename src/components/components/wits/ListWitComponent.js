import React, {useEffect, useRef, useState} from 'react';
import {withRouter} from 'react-router-dom';
import WitComponent from './WitComponent';
import {CircularProgress, Grid} from '@mui/material';
import * as actions from '../../../flux/actions/actions';
import {CHANGE_AUTH_TOKEN, NEW_WITS_RETURNED, POST_WIT} from '../../../util/constants';
import Typography from '@mui/material/Typography';
import {getUnique} from '../../../util/utils';
import {auth} from '../../../services/providers/Firebase';

function ListWitComponent(props) {

    const witStore = props.witStore;
    const authStore = props.authStore;
    const [wits, setWits] = useState([]);
    const [isLastItem, setIsLastItem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(auth.currentUser !== null);
    const feed = props.feed;
    const user = props.user;
    const movie = props.movie;

    useEffect(() => {

        document.addEventListener('scroll', handleScroll);
        witStore.addChangeListener(NEW_WITS_RETURNED, handleNewWits);
        witStore.addChangeListener(POST_WIT, handleNewWits);
        authStore.authAddChangeListener(CHANGE_AUTH_TOKEN, handleAuthChanged);
        loadNextWits();

        return function cleanup() {
            document.removeEventListener('scroll', handleScroll);
            witStore.removeChangeListener(NEW_WITS_RETURNED, handleNewWits);
            witStore.removeChangeListener(POST_WIT, handleNewWits);
            authStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, handleAuthChanged);
        };
        // eslint-disable-next-line
    }, []);

    useEffect( () => {
        // movieId has been changed (new movie)
        setWits([])
    }, [movie])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        return function cleanup() {
            document.removeEventListener('scroll', handleScroll);

        };
        // eslint-disable-next-line
    }, [wits]);

    const handleAuthChanged = (user) => {
        setWits([])
        setIsUserLoggedIn(user !== null);
    };

    const handleNewWits = (data) => {
        if (data.length > 0) {
            setWits(prevState => {
                if (prevState !== null) {
                    let arr = [...prevState, ...data];
                    arr = getUnique(arr, 'id');
                    let a = arr.sort(function(a, b) {
                        return new Date(b.created) - new Date(a.created);
                    });
                    if (JSON.stringify(a) === JSON.stringify(prevState)) {
                        document.removeEventListener('scroll', handleScroll);
                        return prevState
                    }

                    return a;
                } else {
                    return prevState
                }
            });
        } else {
            setIsLastItem(true);
        }
        setIsLoading(false);
    };

    const loadNextWits = () => {
        if (!isLastItem) {
            if (user) {
                actions.getWitsByUser({userId: user.idtoken, startAfter: wits[wits.length - 1]?.created});
            } else if (movie) {
                actions.getWitsByMovie(movie.id);
            } else if (feed) {
                actions.getWitsByFeed({startAfter: wits[wits.length - 1]?.created});
            }
            setIsLoading(true);
        }
    };

    const inputRef = useRef();
    const handleScroll = () => {
        if (inputRef.current !== undefined && inputRef.current !== null) {
            const bottom = inputRef.current.getBoundingClientRect().bottom <= window.innerHeight;
            if (bottom) {
                document.removeEventListener('scroll', handleScroll);
                loadNextWits();
            }
        }
    };

    return (

        <Grid
            ref={inputRef}
            container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{pt: 2}}
            onScroll={handleScroll}
        >
            {isUserLoggedIn ? (
                <>
                    {wits?.map(e => (
                        <WitComponent key={e.id} wit={e} authStore={props.authStore}/>
                    ))}
                    {isLastItem && <Typography>No more wits found</Typography>}
                    {isLoading && <CircularProgress size={30}/>}
                </>
            ) : (
                <Grid container direction={'column'} alignItems={'center'}>
                    login to see wits
                </Grid>
            )}

        </Grid>

    );
}

export default withRouter(ListWitComponent);