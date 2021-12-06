import React from 'react'
import {withRouter} from 'react-router-dom';
import WitComponent from './WitComponent';
import {Grid} from '@mui/material';

function listWitComponent() {


    const wit ={}

    return (
        <Grid
            container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <WitComponent wit={wit}/>
        </Grid>

    )
}


export default withRouter(listWitComponent)