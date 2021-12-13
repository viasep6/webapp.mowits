import ProtectedRoute from './ProtectedRoute';
import {render, prettyDOM, act} from '@testing-library/react';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {CHANGE_AUTH_TOKEN} from './constants';


let store = {};
beforeEach(() => {
    store = {
        authStore:
            {
                state:
                    {
                        // authUser:
                        //     {
                        //         displayName: "some name"
                        //     }
                    },
                authAddChangeListener: (constant, method) => {},
                authRemoveChangeListener: (constat, method) => {},
            },
    };
})
const AllowedComponent = () => (<div>allowed element</div>)

test('ProtectedRoute.test.loggedInOnStart', () => {

    // arrange
    store.authStore.state.authUser = {displayName: 'Some name for valid login'};

    // act
    const renderer = render(
        <BrowserRouter>
            <ProtectedRoute authStore={store.authStore} component={AllowedComponent}/>
        </BrowserRouter>,
    );
    // assert
    console.log('Render output:', prettyDOM(renderer.container.firstChild));
    expect(renderer.container.firstChild).toHaveTextContent('allowed element');
});


test('ProtectedRoute.test.notLoggedInOnStart', () => {

    // arrange
    delete store.authStore.authUser

    // act
    const renderer = render(
        <BrowserRouter>
            <ProtectedRoute authStore={store.authStore} component={AllowedComponent}/>
        </BrowserRouter>,
    );
    // assert
    console.log('Render output:', prettyDOM(renderer.container.firstChild));
    expect(renderer.container.firstChild).toHaveTextContent('login to see this page');
});


test('ProtectedRoute.test.ChangeAuthState', () => {

    // arrange
    store.authStore.state.authUser = {displayName: 'Some name for valid login'};
    let func;

    store.authStore.authAddChangeListener = (eventId, callback) => {
        func = callback;
    }
    const renderer = render(
        <BrowserRouter>
            <ProtectedRoute authStore={store.authStore} component={AllowedComponent}/>
        </BrowserRouter>,
    );

    // act
    act(() => {
        func(null)
    })


    // assert
    console.log('Render output:', prettyDOM(renderer.container.firstChild));
    expect(renderer.container.firstChild).toHaveTextContent('login to see this page');
})