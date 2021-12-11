import React from 'react';
import {Grid, Typography} from '@mui/material';
import Image from 'mui-image';
import {withRouter} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function WelcomeComponent(props) {

    const movie = props.movie;

    return (
        <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center" spacing={2}>

            <Grid item xs sx={{position: 'relative'}}>
                <Image src={movie.backdrop_path} height={'50vh'} sx={{display: 'block'}}/>
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '50vh',
                    width: '100%',
                    background: 'radial-gradient(ellipse farthest-side at top center, #00000000 80%, #ffffff 95%)',
                }}
                />
                {/*overlay box*/}
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                }}>
                    <Typography variant={'h4'}
                                sx={{fontFamily: 'TiemposHeadlineWeb-Bold,Georgia,serif', fontWeight: 400, m: 2}}>
                        Share wits.
                    </Typography>
                    <Typography variant={'h5'}
                                sx={{fontFamily: 'TiemposHeadlineWeb-Bold,Georgia,serif', fontWeight: 400, m: 2}}>
                        Keep track of movies.
                    </Typography>
                    <Typography variant={'h5'}
                                sx={{fontFamily: 'TiemposHeadlineWeb-Bold,Georgia,serif', fontWeight: 400, m: 2}}>
                        Create lists of favorite movies.
                    </Typography>
                </Box>
                <Box sx={{
                    position: 'absolute',
                    top: '10%',
                    right: 0,
                    color: 'rgba(0,0,0,0.60)',
                    transform: 'rotate(-90deg) translate(0, -100%)',
                    transformOrigin: '100% 0',
                }}>
                    <Typography
                        onClick={() => props.history.push('/movie/' + movie.id)}
                        sx={[
                            {fontWeight: 'bolder', mr: 1},
                            (theme) => ({
                                cursor: 'pointer',
                                '&:hover': {
                                    color: theme.palette.primary.main,
                                },
                            }),
                        ]}
                    >
                        {movie.title} ({new Date(movie.release_date).getFullYear()})
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Button variant={'contained'} sx={{mt: 2, pl: 4, pr: 4, color: 'whitesmoke'}}
                        onClick={() => props.history.push('/signup')}>Sign up now - FREE</Button>
            </Grid>
            <Grid item sx={{mt:2}}>
                <Typography variant={'h5'} sx={{letterSpacing: 3, fontWeight: 'medium', fontFamily: 'Thonburi'}}>
                    Social Media for movie lovers
                </Typography>
            </Grid>
        </Grid>

    );
}

export default withRouter(WelcomeComponent);