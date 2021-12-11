import React, {useState} from 'react';
import MovieCollectionItem from "./MovieCollectionItem";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteModal from './DeleteModal';



export default function MovieCollection(props) {
    const [currentCollection] = useState(props.movieCollection)


    const itemClicked = (movieId) => props.onMovieClicked(movieId)
    const deleteItem = (movieId) => {
        const newCollection = []
        currentCollection.forEach(movie => {
            if (parseInt(movie.id) !== parseInt(movieId)) {
                newCollection.push(movie)
            }
        })
        props.onDeleteItem(props.title, newCollection)
    }
    const roarClicked = (movieId) => props.onRoarClicked(movieId)
    const deleteCollection = () => props.onDeleteCollection(props.title)

    return (
        <Grid
            item
            xs={12}
            container
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            marginTop={props.marginTop}
            marginBottom={props.marginBottom}
        >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                marginBottom={2}
            >
                <Typography component="div" variant="h5">
                    {props.title}
                </Typography>

                <DeleteModal
                    enableDelete={props.enableDelete}
                    msg={`Delete your entire ${props.title} collection?`}
                    cannotBeUndone={true}
                    onDelete={deleteCollection}
                />
            </Grid>
            <Grid container direction={"row"} justifyContent={'space-between'} spacing={2} sx={{overflow: "auto"}} wrap={"nowrap"}>
                { currentCollection.map(item => <MovieCollectionItem
                        key={item.id}
                        movie={item}
                        deleteBtn={props.enableDelete}
                        onDelete={deleteItem}
                        disableRoar={props.disableRoars}
                        onRoar={roarClicked}
                        onClick={itemClicked}
                        collectionName={props.title}
                        margin={1}/>) }
            </Grid>
        </Grid>

    )
}