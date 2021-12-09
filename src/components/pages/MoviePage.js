import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {CHANGE_AUTH_TOKEN, GET_MOVIE_DETAILS, MOVIES_PROFILE_DEFAULT_URL} from '../../util/constants';
import * as actions from '../../flux/actions/actions';
import ListWitComponent from '../components/wits/ListWitComponent';
import WriteWitComponent from '../components/wits/WriteWitComponent';
import {auth} from '../../firebase/firebase';
import Box from '@mui/material/Box';
import {ArrowDownwardOutlined} from '@mui/icons-material';
import Image from 'mui-image';

function MoviePage(props) {

    const WitStore = props.stores.witStore;
    const AuthStore = props.stores.authStore;
    const MovieStore = props.stores.movieStore;
    const UserStore = props.stores.userStore;

    const movieId = props.match.params.id;

    const [movie, setMovie] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(auth.currentUser !== null);

    useEffect(() => {
        if (!isNaN(parseInt(movieId))) {
            actions.getMovieDetails(movieId);
        }

        MovieStore.addChangeListener(GET_MOVIE_DETAILS, handleMovieResponse);
        AuthStore.authAddChangeListener(CHANGE_AUTH_TOKEN, handleAuthChanged);

        return function cleanup() {
            MovieStore.removeChangeListener(GET_MOVIE_DETAILS, handleMovieResponse);
            AuthStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, handleAuthChanged);
        };
        // eslint-disable-next-line
    }, []);

    function handleAuthChanged(user) {
        setIsUserLoggedIn(user !== null);
    }

    function handleMovieResponse(movie) {
        setMovie(movie);
        setLoading(false);
    }

    function getProfileImage(cast) {
        if (cast.picture_path === null) {
            cast.picture_path = MOVIES_PROFILE_DEFAULT_URL;
        }
        return cast.picture_path;
    }

    return isLoading ? (
        <Container>
            <Grid container direction={'column'}>
                <Grid item mx={'auto'} mt={5}>
                    <CircularProgress size={100}/>
                </Grid>
                <Grid item mx={'auto'}>
                    <Typography variant={'h5'}>Loading data...</Typography>
                </Grid>
            </Grid>
        </Container>
    ) : (
        <Container sx={{mt: 5}}>
            {/*backdrop*/}
            <Grid sx={{height: '100vh'}}>
                <Box sx={{position: 'absolute', top: 0, left: 0, width: '100%', zIndex: -1}}>
                    <Grid sx={{position: 'relative'}}>
                        <img src={movie.backdrop_path}
                             style={{
                                 height: '100vh',
                                 width: '100%',
                                 objectFit: 'cover',
                             }} alt="Transparent movie backdrop"/>
                        <Grid container alignItems={'flex-end'}
                              sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100vh',
                                  // background: 'linear-gradient(0deg, rgba(255,255,255,1) 3%, rgba(255,255,255,0.4962185557816877) 24%, rgba(255,255,255,0) 100%)',
                              }}
                        >
                            <Grid container direction={'row'} spacing={0}
                                  style={{backgroundColor: 'rgba(0,0,0,0.7)'}}
                                  sx={{
                                      width: '100%', position: 'relative', color: 'whitesmoke',
                                  }}
                            >
                                <Grid item md={2}></Grid>
                                <Grid item offset={2} xs={5} sx={{pt: 2}}>
                                    <Grid item>
                                        <Typography variant={'h4'}>{movie.title}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={'h6'}>{movie.tagline}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography paragraph>{movie.overview}</Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <ArrowDownwardOutlined sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                height: 72,
                                width: 72,
                                color: 'whitesmoke',
                            }} className={'arrow'}/>
                        </Grid>


                    </Grid>

                </Box>
            </Grid>
            {/*content*/}
            <Grid container direction={'row'} spacing={4}>
                <Grid item xs={6} >
                    <Paper elevation={4} >
                        <Image src={movie.poster_path} alt="movie poster" />
                    </Paper>
                </Grid>
                <Grid item xs >
                    <Paper sx={{borderRadius: '2px', p: 1}}>
                        <Typography variant={'h6'}>Movie Information:</Typography>
                        <Typography>Genre(s): {movie.genres}</Typography>
                        <Typography>Languages: {movie.spoken_languages}</Typography>
                        <Typography>Website: <a href={movie.homepage}>Link</a></Typography>
                    </Paper>
                    <Paper  sx={{mt: 4, borderRadius: '2px', p: 1}}>
                        <Typography variant={'h6'}>Statistics:</Typography>
                        <Typography>TMDB Score: {movie.vote_average} ({movie.vote_count} votes)</Typography>
                        <Typography>Wits: <b>TO BE IMPLEMENTED</b></Typography>
                        <Typography>Budget: ${movie.budget}</Typography>
                        <Typography>Revenue: ${movie.revenue}</Typography>
                        <Typography>Run time: {movie.runtime} minutes</Typography>
                    </Paper>
                    <Paper sx={{mt: 4, borderRadius: '2px', p: 1}}>
                        <Typography variant={'h6'}>Director(s):</Typography>
                        <Grid container>
                            {movie.crew.map((cast, key) => (
                                <Grid item key={key} xs={5}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            image={getProfileImage(cast)}
                                            height="300"
                                            width="auto"
                                        />
                                        <CardContent>
                                            <Typography>{cast.name}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container direction={'column'} spacing={2} style={{width: '100%'}}>
                <Grid item>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>} sx={{mt: 2, borderRadius: '8px'}}
                        >
                            <Typography mx={'auto'} variant={'h5'}>Cast</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container>
                                {movie.cast.map((cast, key) => (
                                    <Grid item key={key} xs={2}>
                                        <Card sx={{height: 350}}>
                                            <CardMedia
                                                component="img"
                                                image={getProfileImage(cast)}
                                                height="225"
                                                sx={{borderRadius: '8px'}}
                                            />
                                            <CardContent>
                                                <Typography>{cast.name}</Typography>
                                                <Typography><b>{cast.character}</b></Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Grid container direction={'column'} alignItems={'center'} spacing={2} sx={{mt: 5}}>
                <Typography variant={'h4'}>Movie wits</Typography>
                { // is user logged in
                    isUserLoggedIn && <WriteWitComponent witStore={WitStore} userStore={UserStore} movie={movie}/>
                }
                <ListWitComponent witStore={WitStore} authStore={AuthStore} movie={movie}/>
            </Grid>
        </Container>
    );

}

export default withRouter(MoviePage);
