import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Grid} from '@mui/material';
import {GET_MOVIE_POPULAR} from '../../util/constants';
import WelcomeComponent from '../components/home/WelcomeComponent';
import PopularMoviesBoxComponent from '../components/home/PopularMoviesBoxComponent';
import {getPopularMovies} from '../../flux/actions/actions';

function HomePage(props) {

    const movieStore = props.stores.movieStore;

    const [popularMovies, setPopularMovies] = useState([]);
    const [selectedPopularMovie, setSelectedPopularMovie] = useState();

    useEffect(() => {
        movieStore.addChangeListener(GET_MOVIE_POPULAR, handleNewPopularMovies);
        getPopularMovies()

        return function cleanup() {
            movieStore.removeChangeListener(GET_MOVIE_POPULAR, handleNewPopularMovies);
        };
        // eslint-disable-next-line
    }, []);

    const handleNewPopularMovies = (movies) => {
        setPopularMovies(movies);
    };

    useEffect(() => {
        if (popularMovies.length > 0) {
            const rnd = Math.floor(Math.random() * popularMovies.length);
            setSelectedPopularMovie(popularMovies[rnd]);
        }

    }, [popularMovies]);

    return (
        <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              sx={{p:1}}
        >
            {/**/}
            {/*Items to be displayed in column*/}
            {/**/}

            {/* featured backdrops */}
            <Grid item xs>
                {selectedPopularMovie &&
                <WelcomeComponent movie={selectedPopularMovie}/>
                }
            </Grid>
            <Grid item xs>
                {popularMovies.length > 0 &&
                <PopularMoviesBoxComponent movies={popularMovies}/>
                }

            </Grid>

        </Grid>

    );
}

export default withRouter(HomePage);