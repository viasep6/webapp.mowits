import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import TestPage from './components/pages/TestPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import Menu from './components/Menu';
import MoviePage from './components/pages/MoviePage';
import ErrorPage from './components/pages/ErrorPage';
import ProtectedRoute from './util/ProtectedRoute';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';

import {UserStore} from './flux/stores/UserStore';
import {AuthStore} from './flux/stores/AuthStore';




const theme = createTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#FF5722',
            dark: '#d50000',
            contrastText: '#fff',
        },
    },
});

const authStore = new AuthStore();
const userStore = new UserStore(authStore)
const stores = {authStore, userStore}


function App() {


    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Menu stores={stores}/>
                <div className="container">
                    <Switch>
                        <ProtectedRoute exact path="/favorites" component={() => <TestPage stores={stores}/>}/>
                        <Route exact path="/login" component={() => <LoginPage stores={stores}/>}/>
                        <Route exact path="/signup" component={ () => <SignupPage stores={stores}/>}/>
                        <Route exact path="/test" component={() => <TestPage stores={stores}/>}/>
                        <Route exact path="/" component={() => <HomePage stores={stores}/>}/>
                        <ProtectedRoute path="/profile/:displayName" component={() => <ProfilePage stores={stores}/>}/>
                        <Route path={'/movie/:id'} component={() => <MoviePage stores={stores}/>}/>
                        <Route component={() => <ErrorPage/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}
export default App;
