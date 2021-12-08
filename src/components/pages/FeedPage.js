import React from 'react';
import {Grid} from '@mui/material';
import WriteWitComponent from '../components/wits/WriteWitComponent';
import ListWitComponent from '../components/wits/ListWitComponent';
import {withRouter} from 'react-router-dom';

function FeedPage(props) {

    const UserStore = props.stores.userStore;
    const WitStore = props.stores.witStore;


    return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{mt:4}}
            >
                <WriteWitComponent witStore={WitStore} userStore={UserStore}/>
                <ListWitComponent witStore={WitStore} authStore={props.stores.authStore} getByFeed={undefined}/>
            </Grid>
    );

}

export default withRouter(FeedPage);