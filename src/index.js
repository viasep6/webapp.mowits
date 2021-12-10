import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {CssBaseline} from '@mui/material';
import {BASE_URL} from "./util/constants";
import APIProvider from "./services/providers/APIProvider";
import MovieService from './services/MovieService'
import MovieCollectionService from "./services/MovieCollectionService";
// strict mode is automatically turned off in production mode
// https://stackoverflow.com/a/66304817/3861983
// will make useEffect and state run twice

const apiProvider = APIProvider(BASE_URL)
const moviesService = MovieService(apiProvider)
MovieCollectionService(apiProvider, moviesService)


ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
