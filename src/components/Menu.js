import React, {useEffect, useState} from 'react';
import * as actions from '../flux/actions/actions';
import {CHANGE_AUTH_TOKEN, LOGIN_SUCCESS} from '../util/constants';
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
    padding:1,
    minHeight: 0,
    minWidth: 0,
    ':focus': {
        outline: 'none',
        boxshadow: 'none',
    },

};

function MenuBar(props) {
    const AuthStore = props.stores.authStore;
    const UserStore = props.stores.userStore;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

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

    useEffect(() => {
        // NOTE: use effect is run twice because strict is 'on' in dev mode
        // see https://stackoverflow.com/a/66304817/3861983
        AuthStore.authAddChangeListener(CHANGE_AUTH_TOKEN, authStatusChanged);
        UserStore.userAddChangeListener(LOGIN_SUCCESS, handleLoginSuccess);

        return function cleanup() {
            setIsAuthenticated(false);
            setLoggedInUser(null);
            AuthStore.authRemoveChangeListener(CHANGE_AUTH_TOKEN, authStatusChanged);
            UserStore.userRemoveChangeListener(LOGIN_SUCCESS, handleLoginSuccess);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // empty, used for re-render when authenticated
    }, [isAuthenticated, loggedInUser]);

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
        goToPath('/' + event.currentTarget.id);
    };

    return (
        <AppBar position="static" sx={{color: 'primary.text.primary', backgroundColor: 'primary.background.primary', position: 'fixed', top:0}}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
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

                            <MenuItem key="fav" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Favorites</Typography>
                            </MenuItem>
                            <MenuItem key="test" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Test</Typography>
                            </MenuItem>
                            <MenuItem key="feed" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Feed</Typography>
                            </MenuItem>
                            <MenuItem key="picks" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Picks</Typography>
                            </MenuItem>
                            <MenuItem key="statistics" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Statistics</Typography>
                            </MenuItem>
                            <MenuItem key="profile" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem key="logout" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Logout</Typography>
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
                                Feed
                            </Button>
                            <Button
                                id="picks"
                                onClick={handleCloseNavMenu}
                                sx={sxMenuButton}
                            >
                                Picks
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
                            freeSolo={true}
                            size={'small'}
                            options={top100Films}
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

const top100Films = [
    {label: 'The Shawshank Redemption', year: 1994},
    {label: 'The Godfather', year: 1972},
    {label: 'The Godfather: Part II', year: 1974},
    {label: 'The Dark Knight', year: 2008},
    {label: '12 Angry Men', year: 1957},
    {label: 'Schindler\'s List', year: 1993},
    {label: 'Pulp Fiction', year: 1994},
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    {label: 'The Good, the Bad and the Ugly', year: 1966},
    {label: 'Fight Club', year: 1999},
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    {label: 'Forrest Gump', year: 1994},
    {label: 'Inception', year: 2010},
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    {label: 'One Flew Over the Cuckoo\'s Nest', year: 1975},
    {label: 'Goodfellas', year: 1990},
    {label: 'The Matrix', year: 1999},
    {label: 'Seven Samurai', year: 1954},
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    {label: 'City of God', year: 2002},
    {label: 'Se7en', year: 1995},
    {label: 'The Silence of the Lambs', year: 1991},
    {label: 'It\'s a Wonderful Life', year: 1946},
    {label: 'Life Is Beautiful', year: 1997},
    {label: 'The Usual Suspects', year: 1995},
    {label: 'Léon: The Professional', year: 1994},
    {label: 'Spirited Away', year: 2001},
    {label: 'Saving Private Ryan', year: 1998},
    {label: 'Once Upon a Time in the West', year: 1968},
    {label: 'American History X', year: 1998},
    {label: 'Interstellar', year: 2014},
    {label: 'Casablanca', year: 1942},
    {label: 'City Lights', year: 1931},
    {label: 'Psycho', year: 1960},
    {label: 'The Green Mile', year: 1999},
    {label: 'The Intouchables', year: 2011},
    {label: 'Modern Times', year: 1936},
    {label: 'Raiders of the Lost Ark', year: 1981},
    {label: 'Rear Window', year: 1954},
    {label: 'The Pianist', year: 2002},
    {label: 'The Departed', year: 2006},
    {label: 'Terminator 2: Judgment Day', year: 1991},
    {label: 'Back to the Future', year: 1985},
    {label: 'Whiplash', year: 2014},
    {label: 'Gladiator', year: 2000},
    {label: 'Memento', year: 2000},
    {label: 'The Prestige', year: 2006},
    {label: 'The Lion King', year: 1994},
    {label: 'Apocalypse Now', year: 1979},
    {label: 'Alien', year: 1979},
    {label: 'Sunset Boulevard', year: 1950},
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    {label: 'The Great Dictator', year: 1940},
    {label: 'Cinema Paradiso', year: 1988},
    {label: 'The Lives of Others', year: 2006},
    {label: 'Grave of the Fireflies', year: 1988},
    {label: 'Paths of Glory', year: 1957},
    {label: 'Django Unchained', year: 2012},
    {label: 'The Shining', year: 1980},
    {label: 'WALL·E', year: 2008},
    {label: 'American Beauty', year: 1999},
    {label: 'The Dark Knight Rises', year: 2012},
    {label: 'Princess Mononoke', year: 1997},
    {label: 'Aliens', year: 1986},
    {label: 'Oldboy', year: 2003},
    {label: 'Once Upon a Time in America', year: 1984},
    {label: 'Witness for the Prosecution', year: 1957},
    {label: 'Das Boot', year: 1981},
    {label: 'Citizen Kane', year: 1941},
    {label: 'North by Northwest', year: 1959},
    {label: 'Vertigo', year: 1958},
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    {label: 'Reservoir Dogs', year: 1992},
    {label: 'Braveheart', year: 1995},
    {label: 'M', year: 1931},
    {label: 'Requiem for a Dream', year: 2000},
    {label: 'Amélie', year: 2001},
    {label: 'A Clockwork Orange', year: 1971},
    {label: 'Like Stars on Earth', year: 2007},
    {label: 'Taxi Driver', year: 1976},
    {label: 'Lawrence of Arabia', year: 1962},
    {label: 'Double Indemnity', year: 1944},
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    {label: 'Amadeus', year: 1984},
    {label: 'To Kill a Mockingbird', year: 1962},
    {label: 'Toy Story 3', year: 2010},
    {label: 'Logan', year: 2017},
    {label: 'Full Metal Jacket', year: 1987},
    {label: 'Dangal', year: 2016},
    {label: 'The Sting', year: 1973},
    {label: '2001: A Space Odyssey', year: 1968},
    {label: 'Singin\' in the Rain', year: 1952},
    {label: 'Toy Story', year: 1995},
    {label: 'Bicycle Thieves', year: 1948},
    {label: 'The Kid', year: 1921},
    {label: 'Inglourious Basterds', year: 2009},
    {label: 'Snatch', year: 2000},
    {label: '3 Idiots', year: 2009},
    {label: 'Monty Python and the Holy Grail', year: 1975},
];

export default withRouter(MenuBar);