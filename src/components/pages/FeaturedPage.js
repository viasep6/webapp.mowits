import {withRouter} from 'react-router-dom';
import {Grid} from '@mui/material';
import {useEffect, useState} from 'react';
import FeaturedMoviesComponent from '../components/featured/FeaturedMoviesComponent';
import {
    GET_MOVIE_LATEST,
    GET_MOVIE_NOW_PLAYING,
    GET_MOVIE_POPULAR,
    GET_MOVIE_TOP_RATED,
    GET_MOVIE_UPCOMING,
} from '../../util/constants';

function FeaturedPage(props) {


    const movieStore = props.stores.movieStore;

    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

    const [topWitMovies, setTopWitMovies] = useState([]);
    const [topFollowMovies, setTopFollowMovies] = useState([]);


    function init() {
        movieStore.fetchPopularMovies();
        movieStore.fetchUpcomingMovies();
        movieStore.fetchTopRatedMovies();
        movieStore.fetchNowPlayingMovies();
    }


    useEffect(() => {
        movieStore.addChangeListener(GET_MOVIE_POPULAR, handleNewPopularMovies);
        movieStore.addChangeListener(GET_MOVIE_UPCOMING, handleNewUpcomingMovies)
        movieStore.addChangeListener(GET_MOVIE_TOP_RATED, handleNewTopRatedMovies)
        movieStore.addChangeListener(GET_MOVIE_NOW_PLAYING, handleNewNowPlayingMovies)


        init();

        return function cleanup() {
            movieStore.removeChangeListener(GET_MOVIE_POPULAR, handleNewPopularMovies);
            movieStore.removeChangeListener(GET_MOVIE_UPCOMING, handleNewUpcomingMovies);
            movieStore.removeChangeListener(GET_MOVIE_TOP_RATED, handleNewTopRatedMovies)
            movieStore.removeChangeListener(GET_MOVIE_NOW_PLAYING, handleNewNowPlayingMovies)
        };


        // eslint-disable-next-line
    }, []);


    const handleNewPopularMovies = (movies) => {
        setPopularMovies(movies);
    };
    const handleNewUpcomingMovies = (movies) => {
        setUpcomingMovies(movies);
    };
    const handleNewTopRatedMovies = (movies) => {
        setTopRatedMovies(movies);
    };
    const handleNewNowPlayingMovies = (movies) => {
        setNowPlayingMovies(movies);
    };


    return (
        <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              sx={{p: 0, mt: 5}}
        >
            <Grid xs item>
                Browse for new movie ideas
            </Grid>

            <Grid xs item>
                <FeaturedMoviesComponent movies={nowPlayingMovies} title={"Now Playing"}/>
            </Grid>

            <Grid xs item>
                <FeaturedMoviesComponent movies={upcomingMovies} title={"Upcoming"}/>
            </Grid>

            <Grid xs item sx={{m:0, p:0}}>
                <FeaturedMoviesComponent movies={popularMovies} title={"Popular"}/>
            </Grid>

            <Grid xs item>
                <FeaturedMoviesComponent movies={topRatedMovies} title={"Top Rated"}/>
            </Grid>


            <Grid xs item>
                Top Witted
            </Grid>

            <Grid xs item>
                Top follow
            </Grid>
        </Grid>
    );
}

export default withRouter(FeaturedPage);