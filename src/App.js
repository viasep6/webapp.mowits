import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Menu from './components/Menu';
import TestPage from './components/pages/TestPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import MoviePage from './components/pages/MoviePage';
import ErrorPage from './components/pages/ErrorPage';
import ProtectedRoute from './util/ProtectedRoute';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import FavoritesPage from "./components/pages/FavoritesPage";
import {UserStore} from './flux/stores/UserStore';
import {AuthStore} from './flux/stores/AuthStore';
import {WitStore} from './flux/stores/WitStore';
import {FavoritesStore} from './flux/stores/FavoritesStore'
import {MovieStore} from './flux/stores/MovieStore';
import {Container, CssBaseline} from '@mui/material';
import FeedPage from './components/pages/FeedPage';
import {SearchStore} from "./flux/stores/SearchStore";
import FeaturedPage from './components/pages/FeaturedPage';


const theme = createTheme({
    palette: {
        primary: {
            light: '#4caf50',
            main: '#2e7d32',
            mainOpacity: 'rgba(46,125,50,0.1)',
            dark: '#1b5e20',
            contrastText: '#232323',

            text: {
                primary: '#232323',
                contrastText: 'whitesmoke',
            },
            background: {
                primary: 'whitesmoke',
            },

        },
    },
});

const authStore = new AuthStore();
const userStore = new UserStore(authStore);
const witStore = new WitStore(authStore)
const favoritesStore = new FavoritesStore()
const movieStore = new MovieStore(authStore);
const searchStore = new SearchStore();
const stores = {authStore, userStore, witStore, favoritesStore, searchStore, movieStore};

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Menu stores={stores}/>
                <Container fixed maxWidth={'lg'} sx={{mt:7, pb: 6}} disableGutters>
                    <Switch>
                        <Route exact path="/" component={() => <HomePage stores={stores}/>}/>
                        <Route exact path="/home" component={() => <HomePage stores={stores}/>}/>
                        <ProtectedRoute exact authStore={authStore} path="/favorites" component={() => <FavoritesPage stores={stores}/>}/>
                        <ProtectedRoute exact authStore={authStore} path="/feed" component={() => <FeedPage stores={stores}/>}/>
                        <Route exact path="/login" component={() => <LoginPage stores={stores}/>}/>
                        <Route exact path="/signup" component={() => <SignupPage stores={stores}/>}/>
                        <Route exact path={"/featured"} component={() => <FeaturedPage stores={stores}/>}/>
                        <Route path="/profile/:displayName" component={() => <ProfilePage stores={stores}/>}/>
                        <Route path={'/movie/:id'} component={() => <MoviePage stores={stores}/>}/>
                        <Route exact path="/test" component={() => <TestPage stores={stores}/>}/>
                        <Route component={() => <ErrorPage/>}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
