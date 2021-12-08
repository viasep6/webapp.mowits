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
    Stack,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {MOVIES_PROFILE_DEFAULT_URL} from "../../util/constants";
import WitComponent from "../components/wits/WitComponent";


function MoviePage(props) {

    const [movie, setMovie] = useState();
    const [isLoading, setLoading] = useState(true);
    const movieId = props.match.params.id;
    const MovieStore = props.movieStore;

    useEffect(() => {
        MovieStore.fetchMovieDetails(movieId).then(response => {
            setMovie(response);
            setLoading(false)
        })
    },[MovieStore, movieId])

    function getProfileImage(cast) {
        if (cast.picture_path === null) {
            cast.picture_path = MOVIES_PROFILE_DEFAULT_URL;
        }
        return cast.picture_path
    }


    const imgStyle = {
        borderRadius: 25,
        maxWidth: '100%',
        maxHeight: '100%',
        width: '90%'
    }



    const style = {
        backgroundColor: "rgba(255,255,255,0.80)"
    };

    return isLoading ? (
        <Container>
            <Grid container direction={"column"}>
                <Grid item mx={"auto"} mt={5}>
                    <CircularProgress size={100}/>
                </Grid>
                <Grid item mx={"auto"}>
                    <Typography variant={"h5"}>Loading data...</Typography>
                </Grid>
            </Grid>
        </Container>
    ) : (
        <Container sx={{mt: 5}}>
            <img src={movie.backdrop_path} style={{
                overflow: "visible",
                maxWidth: '100%',
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
                height: '500px',
                width: '100%',
                objectFit: 'cover',
                opacity: 0.6
            }} alt="Transparent movie backdrop"/>
            <Grid container direction={"column"} spacing={2} style={style}>
                <Grid item>
                    <Typography variant={"h3"}>{movie.title}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"h5"}>{movie.tagline}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"h6"} sx={{mb: 0.5, mt: 0.5}}>Summary</Typography>
                    <Typography paragraph>{movie.overview}</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{mt: 4}} style={{maxHeight: '50%'}} spacing={3}>
                <Grid item xs={6}>
                    <img src={movie.poster_path} style={imgStyle} alt="movie poster"/>
                </Grid>
                <Grid item xs>
                    <Paper elevation={7} sx={{borderRadius: '8px', p: 1}}>
                        <Typography variant={"h6"}>Movie Information:</Typography>
                        <Typography>Genre(s): {movie.genres}</Typography>
                        <Typography>Languages: {movie.spoken_languages}</Typography>
                        <Typography>Website: <a href={movie.homepage}>Link</a></Typography>
                    </Paper>
                    <Paper elevation={7} sx={{mt: 4, borderRadius: '8px', p: 1}}>
                        <Typography variant={"h6"}>Statistics:</Typography>
                        <Typography>TMDB Score: {movie.vote_average} ({movie.vote_count} votes)</Typography>
                        <Typography>Wits: <b>TO BE IMPLEMENTED</b></Typography>
                        <Typography>Budget: ${movie.budget}</Typography>
                        <Typography>Revenue: ${movie.revenue}</Typography>
                        <Typography>Run time: {movie.runtime} minutes</Typography>
                    </Paper>
                    <Paper elevation={7} sx={{mt: 4, borderRadius: '8px', p: 1}}>
                        <Typography variant={"h6"}>Director(s):</Typography>
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
            <Grid container direction={"column"} spacing={2} style={{width: '100%'}}>
                <Grid item>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>} sx={{mt: 2, borderRadius: '8px'}}
                        >
                            <Typography mx={"auto"} variant={"h5"}>Cast</Typography>
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
            <Grid container direction={"column"} spacing={2} sx={{mt: 5}}>
                <Paper elevation={7} sx={{borderRadius: '8px', mx: 'auto', width: '50%'}}>
                    <Stack spacing={4}>
                        <Typography variant={"h5"}>Wits go here</Typography>
                    </Stack>
                </Paper>
            </Grid>
        </Container>
    );

}

export default withRouter(MoviePage);
