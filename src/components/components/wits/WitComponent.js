import React, {useState} from 'react';
import moment from 'moment';
import {Avatar, Chip, Divider, Grid, Icon, Typography} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {withRouter} from 'react-router-dom';
import Badge from '@mui/material/Badge';
import likeIcon from '../../../assets/img/like-icon.png';

function WitComponent(props) {


    let witText = `Lorem ipsum dolor sit amet
                   This is a new line
                   and a new line again
                   and another
                   and the last one
                   so this is a long lined text`;
    let profileImage = require('../../../assets/img/menu_logo.png');
    let witUser = 'User1';
    const [likeCount, setLikeCount] = useState(0)
    const date = new Date();
    let movieArray = ['movie1', 'movie2', 'movie3'];



    const witStyle = {
        color: '#414141',
    };
    const dateFormat = 'YYYY-MM-DD HH:mm';
    const dateTime = moment(date).format(dateFormat);
    const [witLikedByUser, setWitLikedByUser] = useState(false);


    const getDisplayTime = (date) => {
        return moment(date).fromNow();
    };

    const handleUserProfileClick = () => {
        props.history.push('/profile/' + witUser);
    };

    const handleLikeWitClick = () => {
        if (!witLikedByUser) {
            setLikeCount( likeCount + 1)
            setWitLikedByUser(true)
        } else {
            setLikeCount(likeCount - 1)
            setWitLikedByUser(false)
        }
    };

    return (
        <Grid
            container
            direction="column"
            maxWidth={600}
        >
            <Grid item xs>
                <Divider/>
            </Grid>
            <Grid sx={[
                {p:2, pt: 2, pb:1},
                (theme) => ({
                    '&:hover': {
                        bgcolor: 'primary.mainOpacity',
                    },
                }),
            ]}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="start"
                >
                    <Grid item sx={{pr: 1}}>
                        <Avatar src={profileImage?.default} sx={{width: 40, height: 40, border: 1, borderColor: 'lightgray'}}/>
                    </Grid>
                    <Grid
                        item
                        xs
                        justifyContent="center"
                        alignItems="flex-start">
                        <Grid
                            container
                            direction="column">
                            <Grid item>

                                <Grid container flexDirection={'row'}>
                                    <Grid container item xs sx={{alignItems: 'center'}}>
                                        <Typography sx={[
                                            {fontWeight: 'bolder', mr: 1},
                                            (theme) => ({
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }),
                                        ]} onClick={handleUserProfileClick}>{witUser}</Typography>
                                        <Typography sx={{...witStyle, mr: 1, fontSize: 10}}>{getDisplayTime(
                                            dateTime)}</Typography>
                                        {movieArray.map(e => {
                                            return <Chip key={e} sx={witStyle} label={e} size="small" variant="outlined"/>;
                                        })}

                                    </Grid>
                                    <Grid>
                                        <MoreHorizIcon/>
                                    </Grid>


                                </Grid>
                            </Grid>

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start">

                                <Typography
                                    variant="body1"
                                    style={{whiteSpace: 'pre-line'}}
                                    sx={{overflowWrap: 'anywhere'}}
                                >
                                    {witText}
                                </Typography>

                            </Grid>
                            <Grid item sx={{pt: 1}}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Icon fontSize="small" sx={witStyle}>chat_bubble_outline</Icon>
                                    <Icon fontSize="small" sx={witStyle}>share</Icon>

                                    <Badge color="success" badgeContent={likeCount} max={999}
                                           sx={[{mr:2, pr:1}, () => ({
                                               cursor: 'pointer'
                                           }),
                                           ]}
                                           onClick={handleLikeWitClick}
                                           >
                                        <img style={{filter: `grayscale(${witLikedByUser ? 30 : 100}%)`}} src={likeIcon} alt="" width="24"
                                             height="24"

                                             title="Add roar to wit"/>
                                    </Badge>


                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    );

}

export default withRouter(WitComponent);