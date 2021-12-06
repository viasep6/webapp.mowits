import React from 'react';
import {Grid, Paper, Typography} from '@mui/material';

function ErrorPage() {

    const image = require('../../assets/img/404image.png').default;
    return (
        <Grid container spacing={2} sx={{justifyContent: 'center', mx: 'auto', m: 5}}>
            <Grid item xs={6} sx={{textAlign: 'center'}}>
                <Paper elevation={3} sx={{p:2}}>
                    <img alt="404 not found" src={image} height={100} width={100}/>
                    <Typography variant="h2" sx={{p: 3}}>
                        404
                    </Typography>
                    <Typography>
                        The page you requested was not found.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ErrorPage;