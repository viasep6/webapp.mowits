import React, {useEffect, useState} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import * as actions from '../flux/actions/actions';

import {CHANGE_AUTH_TOKEN, LOGIN_SUCCESS} from '../util/constants';



function Menu(props) {
    const AuthStore = props.stores.authStore;
    const UserStore = props.stores.userStore;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogout = () => {
        actions.logout();
    }

    const authStatusChanged = (authUser) => {
        if (authUser !== null) {
            if (!isAuthenticated) {
                setIsAuthenticated(true)
            }
        } else {
            if (isAuthenticated || loggedInUser === null) {
                setIsAuthenticated(false)
                setLoggedInUser(null)
            }
        }
    }

    const handleLoginSuccess = (user) => {
        if (loggedInUser !== user) {
            setLoggedInUser(user)
        }
    }




    useEffect(() => {
        // NOTE: use effect is run twice because strict is 'on' in dev mode
        // see https://stackoverflow.com/a/66304817/3861983
        AuthStore.authAddChangeListener(CHANGE_AUTH_TOKEN, authStatusChanged)
        UserStore.userAddChangeListener(LOGIN_SUCCESS, handleLoginSuccess)

        return function cleanup() {
            setIsAuthenticated(false)
            setLoggedInUser(null)
            AuthStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, authStatusChanged)
            UserStore.userRemoveChangeListener(LOGIN_SUCCESS, handleLoginSuccess)
        }
        // eslint-disable-next-line
    }, [])

    useEffect( () => {
        // empty, used for re-render when authenticated
    }, [isAuthenticated, loggedInUser])


    const logoImage = require('../assets/img/menu_logo.png');

    return (
        <nav className="navbar navbar-expand-md main-nav shadow-sm p-2 mb-2 navbar-light">
            <div className="container">

                <button className="navbar-toggler " type="button" data-toggle="collapse"
                        data-target=".navbar-collapse">
                    <span className="navbar-toggler-icon"/>
                </button>


                <img alt="logo" src={logoImage.default} height={45}/>
                <a className="navbar-brand order-first order-md-0 mx-0" href="/">MoWits</a>


                <div className="collapse navbar-collapse w-100">
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/favorites">My Favorites</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/test">Test</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/feed">Feed</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/picks">Picks</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/statistics">Statistics</NavLink>
                        </li>

                    </ul>
                </div>

                <div className="input-group w-100 justify-content-center">
                    <div className="search d-flex col-8">
                        <input type="text"
                               className="form-control"
                               placeholder="Search movie or @username"/>
                        <button className="btn btn-sm fa fa-search"></button>
                    </div>
                </div>

                {isAuthenticated ? (
                    <div className="collapse navbar-collapse w-100">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item my-auto">
                                <NavLink className="nav-link p-0" aria-current="page" to={`/profile/${loggedInUser?.displayName}`}>
                                    <img src={loggedInUser?.profileImage} className="rounded-circle img-fluid border"
                                         alt="profile" height={34} width={34}/>
                                </NavLink>
                            </li>
                            <li className="nav-item my-auto">
                                <NavLink className="nav-link" aria-current="page" to="/">
                                    <button className="btn btn-outline-secondary btn-sm"
                                            onClick={handleLogout}>Logout
                                    </button>
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                ) : (
                    <div className="collapse navbar-collapse w-100">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/login">
                                    <button className="btn btn-outline-secondary btn-sm">Log in</button>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/signup">
                                    <button className="btn btn-success btn-sm">Sign up</button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}

            </div>
        </nav>

    );

}

export default withRouter(Menu)

//
// class Menu extends Component {
//
//     handleLogout = () => {
//         auth.signOut().then(r => {
//             this.props.setUser({isAuthenticated: false});
//         })
//
//
//         this.setState({
//             uiLoading: false,
//             imageLoading: false,
//         });
//     };
//
//     profileClick = () => {
//         this.props.history.push(`/profile/${this.props.user.displayName}`)
//     }
//
//
//     constructor(props) {
//         super(props);
//         this.props = props;
//         this.state = {
//             uiLoading: true,
//             imageLoading: false,
//         };
//         this.image = this.props.user.profileImage
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevProps !== this.props) {
//             this.image = this.props.user.profileImage;
//         }
//     }
//
//
//     render() {
//
//         const logoImage = require('../assets/img/menu_logo.png');
//
//         return (
//             <nav className="navbar navbar-expand-md main-nav shadow-sm p-2 mb-2 navbar-light">
//                 <div className="container">
//
//                     <button className="navbar-toggler " type="button" data-toggle="collapse"
//                             data-target=".navbar-collapse">
//                         <span className="navbar-toggler-icon"/>
//                     </button>
//
//
//                     <img alt="logo" src={logoImage.default} height={45}/>
//                     <a className="navbar-brand order-first order-md-0 mx-0" href="/">MoWits</a>
//
//
//                     <div className="collapse navbar-collapse w-100">
//                         <ul className="nav navbar-nav">
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/favorites">My Favorites</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/test">Test</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/feed">Feed</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/picks">Picks</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to="/statistics">Statistics</NavLink>
//                             </li>
//
//                         </ul>
//                     </div>
//
//                     <div className="input-group w-100 justify-content-center">
//                         <div className="search d-flex col-8">
//                             <input type="text"
//                                    className="form-control"
//                                    placeholder="Search movie or @username"/>
//                             <button className="btn btn-sm fa fa-search"></button>
//                         </div>
//                     </div>
//
//                     {this.props.user.isAuthenticated ? (
//                         <div className="collapse navbar-collapse w-100">
//                             <ul className="nav navbar-nav ml-auto">
//                                 <li className="nav-item my-auto">
//                                     <NavLink className="nav-link p-0" aria-current="page" to={`/profile/${this.props.user.displayName}`}>
//                                         <img src={this.props.user.profileImage} className="rounded-circle img-fluid border"
//                                              alt="profile" height={34} width={34}/>
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item my-auto">
//                                     <NavLink className="nav-link" aria-current="page" to="/">
//                                         <button className="btn btn-outline-secondary btn-sm"
//                                                 onClick={this.handleLogout}>Logout
//                                         </button>
//                                     </NavLink>
//                                 </li>
//
//                             </ul>
//                         </div>
//                     ) : (
//                         <div className="collapse navbar-collapse w-100">
//                             <ul className="nav navbar-nav ml-auto">
//                                 <li className="nav-item">
//                                     <NavLink className="nav-link" aria-current="page" to="/loginPage">
//                                         <button className="btn btn-outline-secondary btn-sm">Log in</button>
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink className="nav-link " aria-current="page" to="/signupPage">
//                                         <button className="btn btn-success btn-sm">Sign up</button>
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         </div>
//                     )}
//
//                 </div>
//             </nav>
//
//         );
//     }
// }
//
// export default withRouter(Menu);