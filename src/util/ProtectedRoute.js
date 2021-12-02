import {Route, withRouter} from 'react-router-dom';
import {auth} from '../firebase/firebase';


function ProtectedRoute({ component: Component, ...rest }) {

    // rest.history.push('/login')

    return (
        // this route takes other route assigned to it from the App.js and return the same route if condition is met

        <Route
            {...rest}
            render={(props) => {

                if (auth.currentUser) {
                    return <Component {...props} />;
                } else {
                    // return the user to the landing page if there is no valid token set
                    return (
                        <div className="m-5 d-flex justify-content-center">login to see this page</div>
                    );
                }
            }}
        />
    );
}

export default withRouter(ProtectedRoute);