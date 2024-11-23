import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    width: '100%',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  media: {
    height: 0,
    paddingTop: '150%', // 3:2 aspect ratio
  },
  favoriteIcon: {
    marginLeft: '8px',
    transition: 'color 0.3s',
    '&:hover': {
      color: 'rgb(239, 68, 68)',
    },
  },
  removeButton: {
    marginTop: '16px',
  },
  content: {
    textAlign: 'center',
    color: 'white',
  },
  title: {
    color: 'white',
  },
  rating: {
    color: 'gray',
  },
});

const MovieCard = ({ movie, selectMovie, URL_IMAGE, showRemoveButton, onRemoveFavorite }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(UserContext);

  const isFavorite = favorites.some(favMovie => favMovie.id === movie.id);
  const classes = useStyles();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Card className={classes.card} onClick={() => selectMovie(movie)}>
      <CardMedia
        className={classes.media}
        image={`${URL_IMAGE}${movie.poster_path}`}
        title={movie.title}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" component="h4" className={classes.title}>
          {movie.title}
          <IconButton className={classes.favoriteIcon} onClick={handleFavoriteClick}>
            <FontAwesomeIcon 
              icon={isFavorite ? solidHeart : regularHeart} 
              style={{ color: isFavorite ? 'rgb(239, 68, 68)' : 'gray' }} 
            />
          </IconButton>
        </Typography>
        <Typography variant="body2" component="p" className={classes.rating}>
          Calificación: {movie.vote_average}
        </Typography>
        {showRemoveButton && (
          <div className={classes.removeButton}>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFavorite();
              }}
            >
              Eliminar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
