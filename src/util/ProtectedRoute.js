import {Route, withRouter} from 'react-router-dom';


function ProtectedRoute({ component: Component, ...rest }) {
    return (
        // this route takes other route assigned to it from the App.js and return the same route if condition is met
        <Route
            {...rest}
            render={(props) => {
                const authToken = localStorage.getItem('AuthToken');
                // console.log(props);
                // if (authToken !== null) {
                //     axios.defaults.headers.common = { Authorization: `${authToken}` };
                //     axios
                //         .get('http://localhost:7071/api/users/get')
                //         .then((response) => {
                //             this.setState({
                //                 displayName: response.data.userCredentials.displayName,
                //                 email: response.data.userCredentials.email,
                //                 // firstName: response.data.userCredentials.firstName,
                //                 // lastName: response.data.userCredentials.lastName,
                //                 // email: response.data.userCredentials.email,
                //                 // phoneNumber: response.data.userCredentials.phoneNumber,
                //                 // country: response.data.userCredentials.country,
                //                 // username: response.data.userCredentials.username,
                //
                //                 uiLoading: false,
                //                 isAuthenticated: true,
                //                 // profilePicture: response.data.userCredentials.imageUrl
                //             });
                //         })
                //         .catch((error) => {
                //             if (error.response.status === 403) {
                //                 this.props.history.push('/login');
                //             }
                //             console.log(error);
                //             this.setState({ errorMsg: 'Error in retrieving the data' });
                //         });
                // }
                //
                //
                //
                // return route if there is a valid token set in the cookie
                if (authToken !== null) {
                    return <Component {...props} />;
                } else {
                    // return the user to the landing page if there is no valid token set
                    return (
                        // rest.history.push('/login')
                        <div className="m-5 d-flex justify-content-center">login to see this page</div>
                    );
                }
            }}
        />
    );
}

export default withRouter(ProtectedRoute);