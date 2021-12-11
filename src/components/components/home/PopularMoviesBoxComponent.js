import React, {useEffect, useState} from 'react';
import {Grid, Paper} from '@mui/material';
import Image from 'mui-image';
import {withRouter} from 'react-router-dom';
import Box from '@mui/material/Box';
import {PlayCircle} from '@mui/icons-material';

function PopularMoviesBoxComponent(props) {

    const movies = props.movies;
    const [selectedMovies, setSelectedMovies] = useState([]);

    // generate len random movies in random order
    function getRandomMovies(m, len) {
        let arr = [];
        let movieList = [];
        while (arr.length < len) {
            let r = Math.floor(Math.random() * m.length);
            if (arr.indexOf(r) === -1) {
                arr.push(r);
                movieList.push(m[r]);
            }
        }
        return movieList;
    }

    let interval = {};

    useEffect(() => {
        setSelectedMovies(getRandomMovies(movies, 12));
        interval = setInterval(() => {setSelectedMovies(getRandomMovies(movies, 12));}, 120000);

        return function cleanup() {
            clearInterval(interval);
        };
    }, [movies]);

    return (
        <Grid container
              direction="row"
              justifyContent="space-evenly"
              alignItems="stretch"
              spacing={2}>
            {
                selectedMovies.length > 0 && selectedMovies.map(movie => {
                    return (
                        <Grid key={movie.id + 'grid'} item xs={4} md={2}>
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
                                    margin:'auto',
                                    top:0,
                                    left:0,
                                    right:0,
                                    bottom:0,
                                    color:'whitesmoke',
                                    opacity: 0,
                                    fontSize:56,
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
        </Grid>
    );
}

export default withRouter(PopularMoviesBoxComponent);