import React, {useState} from 'react';
import MovieListItem from "./MovieListItem";
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';


export default function HorizontalMovieList(props) {
    const title = props.title
    const movies = props.movieList

    const [currentList, setCurrent] = useState(
        typeof props.movieList === 'undefined'
            ? []
            : () => {
                const maxLength = movies.length > 3 ? 3 : movies.length
                let initialList = []
                for (let i = 0; i < maxLength; i++) {
                    initialList.push(movies[i])
                }
                return initialList
            }
    )

    const [currentTailIndex, setTailIndex] = useState(2)

    const hasMoreItems = useState(
        typeof movies === 'undefined'
            ? false
            : movies.length > 3)

    const last = () => {
        if (currentTailIndex === 0) {
            setTailIndex(() => {
                const newIndex = movies.length -1
                updateList(newIndex)
                return newIndex
            })
        }
        else {
            setTailIndex(prevIndex =>  {
                const newIndex = prevIndex - 1
                updateList(newIndex)
                return newIndex
            })
        }

    }

    const next = () => {
        if (currentTailIndex + 1 === movies.length) {
            setTailIndex(() => {
                updateList(0)
                return 0
            })
        }
        else {
            setTailIndex(prevIndex =>  {
                const newIndex = prevIndex + 1
                updateList(newIndex)
                return newIndex
            })
        }
    }

    const updateList = (newTailIndex) => {
        switch (newTailIndex) {
            case 0:
                setCurrent([
                        movies[movies.length - 2],
                        movies[movies.length - 1],
                        movies[newTailIndex]
                    ]
                )
                break
            case 1:
                setCurrent([
                        movies[movies.length - 1],
                        movies[newTailIndex - 1],
                        movies[newTailIndex]
                    ]
                )
                break
            default:
                setCurrent([
                        movies[newTailIndex - 2],
                        movies[newTailIndex - 1],
                        movies[newTailIndex]
                    ]
                )
                break
        }
    }

    const itemClicked = (movieId) => props.onMovieClicked(movieId)
    const deleteClicked = (movieId) => console.log(movieId)
    const roarClicked = (movieId) => console.log(movieId)
    const addMovie = () => props.onAdd(props.title)

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
            >
                <Typography component="div" variant="h5" marginLeft={6}>
                    {title}
                </Typography>
                <IconButton
                    color="primary"
                    aria-label="Add Movie to list."
                    component="span"
                    onClick={addMovie}
                    sx={{ visibility: props.addButton ? 'visible' : 'hidden' }}
                >
                    <AddIcon />
                </IconButton>

            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <IconButton
                    color="primary"
                    aria-label="Go to movie."
                    component="span"
                    onClick={last}
                    sx={{ visibility: hasMoreItems[0] ? 'visible' : 'hidden' }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                { currentList.map(item => <MovieListItem
                    key={item.id}
                    movie={item}
                    deleteBtn={props.enableDelete}
                    onDelete={deleteClicked}
                    disableRoar={props.disableRoars}
                    onRoar={roarClicked}
                    onClick={itemClicked}
                    margin={1}/>) }
                <IconButton
                    color="primary"
                    aria-label="Go to movie."
                    component="span"
                    onClick={next}
                    sx={{ visibility: hasMoreItems[0] ? 'visible' : 'hidden' }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid>
        </Grid>

    )
}