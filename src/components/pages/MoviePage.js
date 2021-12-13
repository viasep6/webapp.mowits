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
    Grid, Modal,
    Paper,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    CHANGE_AUTH_TOKEN,
    GET_MOVIE_DETAILS,
    GET_SIMILAR_MOVIES,
    MOVIES_PROFILE_DEFAULT_URL
} from '../../util/constants';
import * as actions from '../../flux/actions/actions';
import ListWitComponent from '../components/wits/ListWitComponent';
import WriteWitComponent from '../components/wits/WriteWitComponent';
import {auth} from '../../firebase/firebase';
import Box from '@mui/material/Box';
import {ArrowDownwardOutlined, PlayCircleOutlined} from '@mui/icons-material';
import Image from 'mui-image';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import AddMovieToCollection from '../components/movieCollection/AddMovieToCollection';

function MoviePage(props) {

    const WitStore = props.stores.witStore;
    const AuthStore = props.stores.authStore;
    const MovieStore = props.stores.movieStore;
    const UserStore = props.stores.userStore;
    const FavoritesStore = props.stores.favoritesStore;

    const movieId = props.match.params.id;

    const [movie, setMovie] = useState();
    const [similarMovies, setSimilarMovies] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(auth.currentUser !== null);
    const [openModal, setOpenModalModal] = useState(false);
    const [openTrailerModal, setOpenTrailerModal] = useState(false);
    const roarImage = require('../../assets/img/like-icon.png').default;

    useEffect(() => {
        MovieStore.addChangeListener(GET_MOVIE_DETAILS, handleMovieResponse);
        MovieStore.addChangeListener(GET_SIMILAR_MOVIES, handleSimilarMoviesResponse);
        AuthStore.authAddChangeListener(CHANGE_AUTH_TOKEN, handleAuthChanged);

        return function cleanup() {
            MovieStore.removeChangeListener(GET_MOVIE_DETAILS, handleMovieResponse);
            MovieStore.removeChangeListener(GET_SIMILAR_MOVIES, handleSimilarMoviesResponse);
            AuthStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, handleAuthChanged);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!isNaN(parseInt(movieId))) {
            actions.getMovieDetails(movieId);
            actions.getSimilarMovies(movieId);

        }
    }, [isUserLoggedIn, movieId])

    function handleAuthChanged(user) {
        setIsUserLoggedIn(user !== null);
    }

    function handleMovieResponse(movie) {
        if (!movie.errorMessage) {
            setMovie(movie);
            setLoading(false);
        }
    }

    function handleSimilarMoviesResponse(movies) {
        setSimilarMovies(movies);
    }
    const goToPath = path => {
        if (path) {
            props.history.push(path);
        }
    };

    function getProfileImage(cast) {
        if (cast.picture_path === null) {
            cast.picture_path = MOVIES_PROFILE_DEFAULT_URL;
        }
        return cast.picture_path;
    }

    const handleOpenModal = () => setOpenModalModal(true);
    const handleCloseModal = () => setOpenModalModal(false);
    const handleCloseTrailerModal = () => setOpenTrailerModal(false);

    const handleFollowClick = () => {
        actions.followMovie(movie);
        setMovie( prevState => {

            const newState = {
                ...prevState,
                mowits: {
                    ...prevState.mowits,
                    followCount: prevState.mowits.isSubscribed ? prevState.mowits.followCount -1 : prevState.mowits.followCount +1,
                    isSubscribed: !prevState.mowits.isSubscribed
                }
            }
            return newState
        })
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
        <Container sx={{mt: 0, mb:0}} disableGutters>
            {/*backdrop*/}
            <Grid sx={{height: '100vh', '&:hover > *': {opacity: 1}}}>

                {movie.trailer && <PlayCircleOutlined sx={{
                    position: 'absolute',
                    top:0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    margin: 'auto',
                    height: 120,
                    width: 120,
                    color: 'whitesmoke',
                    opacity: 0.3,
                    cursor: 'pointer',
                }} onClick={() => setOpenTrailerModal(true)}/>}


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

            <Grid
                container
                direction="row"
                spacing={2}
            >
                {/*poster grid*/}
                <Grid item md>
                    <Paper elevation={2} sx={{borderRadius: 1}}>
                        <Image src={movie.poster_path} alt="movie poster" onClick={handleOpenModal}
                               sx={[{}, () => ({cursor: 'pointer'})]}/>
                    </Paper>
                </Grid>
                {/*right column grid*/}
                <Grid
                    item
                    xs
                    container
                    direction="column"
                    justifyContent={'space-between'}
                    spacing={2}
                >
                    <Grid item>
                        <Paper sx={{borderRadius: 1, p: 1, display: 'flex',alignItems: 'center', justifyContent: 'space-between'}}>
                            <Box>
                                <Button
                                    variant={'outlined'}
                                    disabled={!isUserLoggedIn}
                                    onClick={handleFollowClick}>
                                    {movie.mowits !== undefined && movie.mowits?.isSubscribed ? "Unfollow" : "Follow"}
                                </Button>
                                <Badge color="success" badgeContent={movie.mowits !== undefined && movie.mowits.followCount ? movie.mowits.followCount : 0} max={9999} className={'shake'}>
                                    <Image src={roarImage} fit={'scale-down'} height={40} width={40} title={'Rawr the movie to get wits on your feed'}/>
                                </Badge>
                            </Box>
                            <AddMovieToCollection
                                disabled={!isUserLoggedIn}
                                favoritesStore={FavoritesStore}
                                accessToken={isUserLoggedIn ? AuthStore.state.authUser.accessToken : ''}
                                movieId={movie.id}
                                movieTitle={movie.title}
                            />
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper sx={{borderRadius: 1, p: 1}}>
                            <Typography variant={'h6'}>Movie Information:</Typography>
                            <Typography>Genre(s): {movie.genres}</Typography>
                            <Typography>Languages: {movie.spoken_languages}</Typography>
                            <Typography>Website: <a href={movie.homepage}>Link</a></Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper sx={{borderRadius: 1, p: 1}}>
                            <Typography variant={'h6'}>Statistics:</Typography>
                            <Typography>TMDB Score: {movie.vote_average} ({movie.vote_count} votes)</Typography>
                            <Typography>Wits: <b>{movie.mowits !== undefined ? movie.mowits.witCount : 0}</b></Typography>
                            <Typography>Budget: ${movie.budget}</Typography>
                            <Typography>Revenue: ${movie.revenue}</Typography>
                            <Typography>Run time: {movie.runtime} minutes</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper sx={{borderRadius: 1, p: 1}}>
                            <Typography variant={'h6'}>Director(s):</Typography>
                            <Grid container>
                                {movie.crew.map((cast, key) => (
                                    <Grid item key={key}>
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
            </Grid>


            {/*casts*/}
            <Grid container direction={'column'} spacing={2}>
                <Grid item>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>} sx={{mt: 2, borderRadius: 1}}
                        >
                            <Typography mx={'auto'} variant={'h5'}>Cast</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container justifyContent={'center'}>
                                {movie.cast.map((cast, key) => (
                                    <Grid item key={key} sx={{m: 1}}>
                                        <Card sx={{height: 375, width: 200}}>
                                            <CardMedia
                                                component="img"
                                                image={getProfileImage(cast)}
                                                height="275"
                                                sx={{borderRadius: 1}}
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

            {/* Similar movies */}
            <Typography align={"center"} variant={'h5'} mt={5}>You may also like:</Typography>
            <Grid container direction={"row"} justifyContent={'space-between'} spacing={2} sx={{overflow: "auto"}} wrap={"nowrap"}>
                {similarMovies?.map((similarMovie, key) => (
                    <Grid item key={key} xs="auto">
                        <Card onClick={() => {
                            goToPath("/movie/" + similarMovie.id);
                            window.scrollTo({top: 0, left: 0, behavior: "smooth" });
                        }}>
                            <CardMedia
                                component="img"
                                image={similarMovie.poster_path}
                                height="300"
                                sx={{borderRadius: 1}}
                            />
                            <CardContent>
                                <Typography>{similarMovie.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/*wits */}
            <Grid container direction={'column'} alignItems={'center'} spacing={2} sx={{mt: 5}}>
                <Typography variant={'h4'}>Movie wits</Typography>
                { // is user logged in
                    isUserLoggedIn && <WriteWitComponent witStore={WitStore} userStore={UserStore} movie={movie}/>
                }
                <ListWitComponent witStore={WitStore} authStore={AuthStore} movie={movie}/>
            </Grid>

            {/*poster large modal*/}
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{bgcolor: 'rgba(0,0,0,0.85)'}}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: '95%',
                        bgcolor: 'black',
                        border: 0,
                        borderRadius: 0,
                    }}>
                        <Image src={movie.poster_path} alt="movie poster" onClick={handleCloseModal} height={'95%'}/>
                    </Box>
                </Modal>
            </div>

            {/*YouTube Trailer Modal*/}
            <Modal
                open={openTrailerModal}
                onClose={handleCloseTrailerModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{bgcolor: 'rgba(0,0,0,0.80)'}}
            >
                <iframe
                    src={movie.trailer}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: "70%",
                        height: "70%",
                        margin: "auto"
                    }}
                />
            </Modal>
        </Container>
    );

}

export default withRouter(MoviePage);
