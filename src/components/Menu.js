import React, {useEffect, useState} from 'react';
import * as actions from '../flux/actions/actions';
import {CHANGE_AUTH_TOKEN, DEBOUNCE_TIME, GET_SEARCH_RESULTS, LOGIN_SUCCESS} from '../util/constants';
import {withRouter} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Autocomplete, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const sxMenuButton = {
    color: 'primary.text.primary',
    fontSize: '0.75rem',
    fontWeight: 'medium',
    padding: 1,
    minHeight: 0,
    minWidth: 0,
    ':focus': {
        outline: 'none',
        boxshadow: 'none',
    },
};
const _ = require('lodash');

function MenuBar(props) {
    const AuthStore = props.stores.authStore;
    const UserStore = props.stores.userStore;
    const SearchStore = props.stores.searchStore;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [searchData, setSearchData] = useState([]);

    const handleLogout = () => {
        actions.logout();
    };

    const authStatusChanged = (authUser) => {
        if (authUser !== null) {
            if (!isAuthenticated) {
                setIsAuthenticated(true);
            }
        } else {
            if (isAuthenticated || loggedInUser === null) {
                setIsAuthenticated(false);
                setLoggedInUser(null);
            }
        }
    };

    const handleLoginSuccess = (user) => {
        if (loggedInUser !== user) {
            setLoggedInUser(user);
        }
    };

    const handleSearchResult = (result) => {
        setSearchData(result);
    };


    useEffect(() => {
        // NOTE: use effect is run twice because strict is 'on' in dev mode
        // see https://stackoverflow.com/a/66304817/3861983
        AuthStore.authAddChangeListener(CHANGE_AUTH_TOKEN, authStatusChanged);
        UserStore.userAddChangeListener(LOGIN_SUCCESS, handleLoginSuccess);
        SearchStore.addSearchChangeListener(GET_SEARCH_RESULTS, handleSearchResult)

        return function cleanup() {
            setIsAuthenticated(false);
            setLoggedInUser(null);
            AuthStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, authStatusChanged);
            UserStore.userRemoveChangeListener(LOGIN_SUCCESS, handleLoginSuccess);
            SearchStore.removeSearchChangeListener(GET_SEARCH_RESULTS, handleSearchResult)
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // empty, used for re-render when authenticated
    }, [isAuthenticated, loggedInUser]);

    const searchInputChanged = (input) =>
        actions.getSearchResults(input);

    const debounce = _.debounce(searchInputChanged, DEBOUNCE_TIME);

    const logoImage = require('../assets/img/menu_logo.png');

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const goToPath = path => {
        if (path) {
            props.history.push(path);
        }
    };

    const handleCloseNavMenu = (event) => {
        setAnchorElNav(null);
        if (event.currentTarget.id) {
            goToPath('/' + event.currentTarget.id);
        }
    };

    return (
        <AppBar position="static" sx={{
            color: 'primary.text.primary',
            backgroundColor: 'primary.background.primary',
            position: 'fixed',
            top: 0,
        }} style={{zIndex: 999}}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        onClick={handleCloseNavMenu}
                    >
                        <Avatar src={logoImage.default} variant="square" sx={{mr: 0}}/>
                        MoWits
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            // color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >

                            <MenuItem id={'home'} key="home" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem id={'favorites'} key="fav" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Favorites</Typography>
                            </MenuItem>
                            <MenuItem id={'test'} key="test" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Test</Typography>
                            </MenuItem>
                            <MenuItem id={'feed'} key="feed" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">My Feed</Typography>
                            </MenuItem>
                            <MenuItem id={'statistics'} key="statistics" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Statistics</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        <Avatar src={logoImage.default} variant="square"/>
                    </Typography>

                    {/*Menu items*/}
                    <Box sx={{flexGrow: 2, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            id="home"
                            onClick={handleCloseNavMenu}
                            sx={sxMenuButton}
                        >
                            Home
                        </Button>
                        <Button
                            id="favorites"
                            onClick={handleCloseNavMenu}
                            sx={sxMenuButton}
                        >
                            Favorites
                        </Button>
                        <Button
                            id="test"
                            onClick={handleCloseNavMenu}
                            sx={sxMenuButton}
                        >
                            Test
                        </Button>
                        <Button
                            id="feed"
                            onClick={handleCloseNavMenu}
                            sx={sxMenuButton}
                        >
                            My Feed
                        </Button>
                        <Button
                            id="statistics"
                            onClick={handleCloseNavMenu}
                            sx={sxMenuButton}
                        >
                            Statistics
                        </Button>

                    </Box>
                    {/*Search field*/}
                    <Box sx={{flexGrow: 0, display: {md: 'flex'}, ml: 2, mr: 2}}>

                        <SearchIcon sx={{my: 'auto', display: {xs: 'none', md: 'flex'}}}/>
                        <Autocomplete
                            id="search"
                            onChange={(event, newValue) => {
                                if (newValue !== null) {
                                    props.history.push('/movie/' + newValue.id )
                                }
                            }}
                            onInputChange={(event, newInputValue) => {
                                debounce(newInputValue);
                            }}
                            freeSolo={true}
                            size={'small'}
                            options={searchData}
                            sx={{width: 250}}
                            renderInput={(params) => <TextField {...params} label="Search movie"/>}
                            // filterOptions={(x) => x}
                        />

                    </Box>
                    {
                        isAuthenticated ? (
                            <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                                <IconButton onClick={() => goToPath('/profile/' + loggedInUser?.displayName)}
                                            sx={sxMenuButton}>
                                    <Avatar alt="profile image" src={loggedInUser?.profileImage}
                                            sx={{width: 34, height: 34, m: 1}}
                                    />
                                </IconButton>
                                <Button
                                    variant={'outlined'}
                                    onClick={handleLogout}
                                    sx={{...sxMenuButton, my: 'auto'}}
                                >
                                    Logout
                                </Button>
                            </Box>
                        ) : (
                            /*User login/out/profile*/
                            <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>

                                <Button
                                    id="login"
                                    onClick={handleCloseNavMenu}
                                    sx={sxMenuButton}
                                >
                                    Login
                                </Button>
                                <Button
                                    id="signup"
                                    variant="contained"
                                    onClick={handleCloseNavMenu}
                                    sx={{...sxMenuButton, color: 'white'}}
                                >
                                    Signup
                                </Button>
                            </Box>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );

}
export default withRouter(MenuBar);