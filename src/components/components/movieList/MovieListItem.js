import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Badge from "@mui/material/Badge";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import likeIcon from '../../../assets/img/like-icon.png';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MovieListItem(props) {
    const movie = props.movie
    const itemClicked = () => props.onClick(movie.id)
    const deleteClicked = () => props.onDelete(movie.id)
    const roarClicked = () => props.onRoar(movie.id)

    return (
        <Card sx={{p: 2, maxWidth:355, margin:props.margin}}
              onClick={itemClicked}
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Grid
                    item
                    xs
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Badge
                        badgeContent={movie.vote_average * 10 + '%'}
                        color="success"
                    >
                        <CardMedia
                            component="img"
                            sx={{ height: '100%' }}
                            image={movie.poster_path}
                            alt="Movie cover"
                        />
                    </Badge>
                </Grid>
                <Grid
                    item
                    xs={7}
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    <CardContent>
                        <Typography component="div" variant="h5">
                            {movie.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {new Date(movie.release_date).getFullYear().toString()}
                        </Typography>
                    </CardContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        paddingLeft={1}
                    >
                        <IconButton
                            aria-label="delete"
                            size="medium"
                            sx={{ visibility: props.deleteBtn ? 'visible' : 'hidden' }}
                            onClick={deleteClicked}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <Badge color="success"
                               title={'Movie roars!'}
                               badgeContent={movie.roars}
                               max={999}
                               sx={[ {mr:2, pr:1} ]}
                        >
                            <IconButton
                                aria-label="delete"
                                size="medium"
                                disabled={props.disableRoar}
                                onClick={roarClicked}
                            >
                                <img style={{filter: `grayscale(${movie.roars > 0 ? 30 : 100}%)`}}
                                     src={likeIcon}
                                     alt=""
                                     title="Movie roars!"/>
                            </IconButton>
                        </Badge>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}