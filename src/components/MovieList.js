import React from 'react';
import MovieCard from './MovieCard'; // Ensure you import the MovieCard component

const MovieList = ({ movies, selectMovie, URL_IMAGE, showRemoveButton, onRemoveFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          selectMovie={selectMovie}
          URL_IMAGE={URL_IMAGE}
          showRemoveButton={showRemoveButton}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
    </div>
  );
};

export default MovieList;