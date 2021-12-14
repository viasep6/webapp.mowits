import React from 'react';
import {prettyDOM, render, queryByAttribute, act, fireEvent} from '@testing-library/react';
import Menu from './Menu';
import {BrowserRouter} from 'react-router-dom';
import {AuthStore} from '../flux/stores/AuthStore';
import {UserStore} from '../flux/stores/UserStore';
import {WitStore} from '../flux/stores/WitStore';
import {MovieStore} from '../flux/stores/MovieStore';
import MenuBar from './Menu';

// mock third party library
jest.mock('firebase/firestore', () => {
    return {
        getFirestore: jest.fn(),
    };
});

jest.mock('axios');

let stores = {};
beforeEach(() => {
    const authStore = new AuthStore();
    const userStore = new UserStore(authStore);
    const witStore = new WitStore(authStore);
    const movieStore = new MovieStore(authStore);
    stores = {authStore, userStore, witStore, movieStore};
});

const getById = queryByAttribute.bind(null, 'id');

test('Menu.test.containsElements.notLoggedIn', () => {
    // arrange
    const elementRequired = ['home', 'login', 'signup'];
    // act
    let renderer = render(
        <BrowserRouter>
            <Menu stores={stores}/>
        </BrowserRouter>,
    );

    // assert
    for (let el of elementRequired) {
        const element = getById(renderer.container, el);
        expect(element).toBeDefined();
        el = el.charAt(0).toUpperCase() + el.substr(1);
        expect(element).toHaveTextContent(el);
    }

    console.log('Render output:', prettyDOM(renderer.container.firstChild));
});

test('Menu.test.containsElements.loggedIn', () => {

    // arrange
    const elementRequired = ['home', 'favorites', 'feed'];
    const elementsNotShown = ['login', 'signup'];

    const MenuComponent = MenuBar;
    let authStatusChanged;
    stores.authStore.authAddChangeListener = (eventId, callback) => {
        authStatusChanged = callback;
    };
    // act
    let renderer = render(
        <BrowserRouter>
            <MenuComponent stores={stores}/>
        </BrowserRouter>,
    );

    act(() => {
        authStatusChanged('some user details');
    });

    console.log('Render output:', prettyDOM(renderer.container.firstChild));

    // assert
    for (let el of elementRequired) {

        const element = getById(renderer.container, el);
        expect(element).toBeDefined();
        el = el.charAt(0).toUpperCase() + el.substr(1);
        console.log('testing element', el);
        expect(element).toHaveTextContent(el);
    }
    for (let el of elementsNotShown) {
        const element = getById(renderer.container, el);
        expect(element).toBeNull();
    }

});