import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import TestPage from './components/pages/TestPage';
import LoginPage from './components/pages/login';
import signup from './components/pages/signup';
import Menu from './components/Menu';
import MoviePage from './components/pages/MoviePage';
import ErrorPage from './components/pages/ErrorPage';
import ProtectedRoute from './util/ProtectedRoute';
import HomePage from './components/pages/HomePage';
import axios from 'axios';
import {URL_GET_USER} from './util/constants';
import ProfilePage from './components/pages/ProfilePage';
import {auth} from './firebase/firebase';

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


function App() {

    const [user, setUser] = useState({
        displayName: '',
        email: '',
        profileImage: require('./assets/img/defaultprofile.jpg').default,
        isAuthenticated: false,
    });
    //perhaps move this to firebase.js
    auth.onAuthStateChanged(authUser => {
        authUser ? localStorage.setItem('authUser', JSON.stringify(authUser)) : localStorage.removeItem('authUser');
        authUser
            ? localStorage.setItem('AuthToken', `Bearer ${authUser.stsTokenManager.accessToken}`)
            : localStorage.removeItem('AuthToken');
    });

    useEffect(() => {
        let token = localStorage.getItem('AuthToken');
        if (token !== null && !user.isAuthenticated) {
            axios.defaults.headers.common = {Authorization: token};
            axios
                .get(URL_GET_USER)
                .then((response) => {
                    setUser({
                        displayName: response.data.userCredentials.displayName,
                        email: response.data.userCredentials.email,
                        profileImage: response.data.userCredentials.profileImage
                            ? response.data.userCredentials.profileImage
                            : user.profileImage,
                        isAuthenticated: true,
                    });
                })
                .catch((error) => {
                    if (error.response.status === 403) {
                        localStorage.removeItem('AuthToken');
                    }
                });
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Menu user={user} setUser={setUser} />
                <div className="container">
                    <Switch>
                        <ProtectedRoute exact path="/favorites" component={TestPage}/>
                        <Route exact path="/login" component={() => <LoginPage setUser={setUser}/>}/>
                        <Route exact path="/signup" component={signup}/>
                        <Route exact path="/test" component={TestPage}/>
                        <Route exact path="/" component={HomePage}/>
                        <ProtectedRoute path="/profile/:displayName" component={ProfilePage}/>
                        <Route path={'/movie/:id'} component={MoviePage}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
