import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Badge from "@mui/material/Badge";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import likeIcon from '../../../assets/img/like-icon.png';
import DeleteModal from './DeleteModal';

export default function MovieCollectionItem(props) {
    const movie = props.movie
    const itemClicked = () => props.onClick(movie.id)
    const deleteClicked = () => props.onDelete(movie.id)
    const roarClicked = () => props.onRoar(movie.id)

    return (
        <Card sx={{p: 2, maxWidth:590, minWidth:385, margin:props.margin}}
              onClick={() => {
                  window.scrollTo({top: 0, left: 0, behavior: "smooth" });
              }}
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Grid
                    item
                    xs={6}
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
                            sx={{ height: '100%', cursor:'pointer' }}
                            image={movie.poster_path}
                            alt="Movie cover"
                            onClick={itemClicked}
                        />
                    </Badge>
                </Grid>
                <Grid
                    item
                    xs
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    <Grid
                        item
                        xs
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="stretch"
                        sx={{cursor: 'pointer'}}
                        onClick={itemClicked}
                    >
                        <CardContent>
                            <Typography component="div" variant="h5">
                                {movie.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {new Date(movie.release_date).getFullYear().toString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        paddingLeft={1}
                    >
                        <DeleteModal
                            enableDelete={props.deleteBtn}
                            msg={`Delete ${movie.title} from ${props.collectionName}?`}
                            cannotBeUndone={false}
                            onDelete={deleteClicked}
                        />
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

