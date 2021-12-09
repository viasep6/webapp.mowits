import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {WitStore} from '../../../flux/stores/WitStore';
import {UserStore} from '../../../flux/stores/UserStore';
import {Avatar, CircularProgress, Grid, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import * as actions from '../../../flux/actions/actions';
import {LOGIN_SUCCESS, POST_WIT} from '../../../util/constants';
import {withStyles} from '@mui/styles';

function WriteWitComponent(props) {

    const witStore = props.witStore;

    const userStore = props.userStore;
    const movie = props.movie;

    const [count, setCount] = React.useState(0);
    const maxCount = 200;
    const [text, setText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorText, setErrorText] = React.useState();
    const [user, setUser] = React.useState(userStore.state.loggedInUser)

    useEffect(() => {
        witStore.addChangeListener(POST_WIT, handlePostResponse)
        userStore.userAddChangeListener(LOGIN_SUCCESS, (user) => {
            setUser(user)
        })
        setUser(userStore.state.loggedInUser)
        return function cleanup() {
            witStore.removeChangeListener(POST_WIT, handlePostResponse);
            userStore.userRemoveChangeListener(LOGIN_SUCCESS, () => {})
        };
        // eslint-disable-next-line
    }, [])


    const countStyle = {
        'fontSize': '10px',
    };

    const onPostWit = () => {
        actions.postWit({
            text: text,
            movieTags: [{movieId: movie.id, title:movie.title}],
            userTags: [],
        });
        setText('');
        setIsLoading(true)
    };

    function handlePostResponse(response) {
        if (response !== undefined) {
            setIsLoading(false)
            if (response.error) {
                setErrorText(response.error)
            } else {
                setErrorText(null)
            }
        }
    }

    const onChange = (e) => {
        setCount(e.target.value.length);

        if (e.target.value.length < maxCount) {
            setText(e.target.value);
        }
    };

    return (

        <Grid
            container
            justifyContent={'center'}
            maxWidth={600}
        >
            <Grid sx={{m: 1, my: 'auto'}}>
                <Avatar src={user?.profileImage} alt="profile" height={46} width={46} sx={{border:1, borderColor:'lightgray'}}/>
            </Grid>
            <Grid item xs sx={{m: 1}}>
                <TextField
                    label="Share your movie wits"
                    onChange={onChange}
                    fullWidth={true}
                    value={text}
                    multiline
                    minRows={3}
                    maxRows={5}
                    InputProps={{style: {fontSize: 14}}}
                    variant="filled"
                    helperText={errorText}
                    error={!!errorText}
                />


            </Grid>
            <Grid item sx={{m: 1, my: 'auto'}}>
                <Button variant="contained" sx={{ml: 1, color:'white'}} onClick={onPostWit}>
                    Post
                    {isLoading && <CircularProgress size={30} className={props.progess}/>}
                </Button>
                <Grid textAlign={'center'}>
                    <span style={countStyle}>{count}/{maxCount}</span>
                </Grid>
            </Grid>

        </Grid>

    );
}

WriteWitComponent.propTypes = {
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    witStore: PropTypes.instanceOf(WitStore).isRequired,
};


const styles = (theme) => ({
    progess: {
        position: 'absolute',
    },
});

export default withRouter(withStyles(styles)(WriteWitComponent));