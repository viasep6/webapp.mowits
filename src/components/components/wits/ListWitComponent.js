import React, {useEffect, useRef, useState} from 'react';
import {withRouter} from 'react-router-dom';
import WitComponent from './WitComponent';
import {CircularProgress, Grid} from '@mui/material';
import * as actions from '../../../flux/actions/actions';
import {NEW_WITS_RETURNED, POST_WIT} from '../../../util/constants';
import Typography from '@mui/material/Typography';
import {getUnique} from '../../../util/utils';

function ListWitComponent(props) {

    const witStore = props.witStore;
    const [wits, setWits] = useState([]);
    const [isLastItem, setIsLastItem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = props.getByUser;
    const movie = props.getByMovie;

    useEffect(() => {

        document.addEventListener('scroll', handleScroll);
        witStore.addChangeListener(NEW_WITS_RETURNED, handleNewWits);
        witStore.addChangeListener(POST_WIT, handleNewWits);
        loadNextWits();

        return function cleanup() {
            document.removeEventListener('scroll', handleScroll);
            witStore.removeChangeListener(NEW_WITS_RETURNED, handleNewWits);
            witStore.removeChangeListener(POST_WIT, handleNewWits);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        return function cleanup() {
            document.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line
    }, [wits]);

    const handleNewWits = (data) => {

        if (data.length > 0) {
            setWits(prevState => {
                let arr = [...prevState, ...data];
                arr = getUnique(arr, 'id');
                return arr.sort(function(a, b) {
                    return new Date(b.created) - new Date(a.created);
                });
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

            } else if (props.getByFeed) {
                actions.getWitsByFeed({startAfter: wits[wits.length - 1]?.created});
            }
            setIsLoading(true);
        }
    };

    const inputRef = useRef();
    const handleScroll = () => {
        if (inputRef.current !== undefined) {
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

            {wits.map(e => (
                <WitComponent key={e.id} wit={e} authStore={props.authStore}/>
            ))}

            {isLastItem && <Typography>No more wits found</Typography>}
            {isLoading && <CircularProgress size={30}/>}
        </Grid>

    );
}

export default withRouter(ListWitComponent);