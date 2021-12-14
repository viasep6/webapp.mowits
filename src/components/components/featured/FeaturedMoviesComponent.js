import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from '@mui/material';
import Image from 'mui-image';
import Box from '@mui/material/Box';
import {PlayCircle} from '@mui/icons-material';
import {withRouter} from 'react-router-dom';

function MovieListComponent(props) {

    const movies = props.movies;
    const title = props.title;
    const maxMovies = 18

    const [displayedMovies, setDisplayedMovies] = useState([]);
    const [componentTitle, setComponentTitle] = useState(title);

    useEffect(() => {
        if (movies.length > 0) {
            setDisplayedMovies(movies.slice(0, maxMovies));
        }
    }, [movies]);

    useEffect(() =>{
        setComponentTitle(title)
    }, [title])

    return (
        <>
            { displayedMovies.length > 0 ? (
                <Grid>
                    <Typography
                        sx={{fontWeight: 'bolder',
                            fontSize: 64,
                            textTransform: 'uppercase',
                            color: 'rgba(0,0,0,0.60)',
                            display: { xs: 'block', sm: 'block', md:'none' }}}
                    >
                        {componentTitle}
                    </Typography>
                    <Grid container
                          sx={{position:'relative'}}
                          direction="row"
                          justifyContent="start"
                          alignItems="stretch"
                          spacing={1.5}
                    >

                        {
                            displayedMovies.length > 0 && displayedMovies.map(movie => {
                                return (
                                    <Grid key={movie.id + 'grid'} item xs={4} md={2}  >
                                        <Paper
                                            sx={[
                                                {height: '100%', position: 'relative'}, (theme) => ({
                                                    overflow: 'hidden',
                                                    '&:hover #imgid': {
                                                        transform: 'scale(1.1)',
                                                    },
                                                    '&:hover > *': {
                                                        opacity: 1,
                                                    },

                                                })]}
                                            elevation={3}
                                        >

                                            <Image
                                                id="imgid"
                                                key={movie.id + 'featured'}
                                                src={movie.poster_path}
                                                fit={'cover'}
                                            />

                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    height: '100%',
                                                    width: '100%',
                                                    transition: '1.5s ease',
                                                    backdropFilter: 'blur(3px)',
                                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                                    opacity: 0,
                                                    overflow: 'hidden',
                                                }}>

                                            </Box>
                                            <PlayCircle sx={{
                                                position: 'absolute',
                                                margin: 'auto',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                color: 'whitesmoke',
                                                opacity: 0,
                                                fontSize: 56,
                                                cursor: 'pointer',
                                            }} onClick={() => props.history.push('/movie/' + movie.id)}/>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    width: '100%',
                                                    height: '20%',
                                                    color: 'whitesmoke',
                                                    pt: 1,
                                                    pl: 1,
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    bgcolor: 'rgba(0,0,0,0.7)',
                                                    opacity: 0,
                                                    transition: '0.4s ease',
                                                }}>
                                                {movie.title} ({new Date(movie.release_date).getFullYear()})
                                            </Box>
                                        </Paper>
                                    </Grid>
                                );
                            })
                        }
                        <Box sx={{
                            textAlign:'end',
                            position: 'absolute',
                            right: '100%',
                            top: 0,
                            whiteSpace: 'nowrap',

                            transform: 'rotate(-90deg) translate(0, -100%)',
                            transformOrigin: '100% 0',
                            display: {xs: 'none', sm:'none' , md: 'block'}
                        }}>
                            <Typography
                                sx={{fontWeight: 'bolder', fontSize: 72, textTransform: 'uppercase', color: 'rgba(0,0,0,0.60)'}}
                            >
                                {componentTitle}
                            </Typography>
                        </Box>
                    </Grid>
                    <hr/>
                </Grid>
            ) : (
                <></>
            )
            }
        </>



    );

}

export default withRouter(MovieListComponent);