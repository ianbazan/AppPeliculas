import React, { useState, useEffect, useRef } from 'react';
import MovieCard from '../components/MovieCard';
import PopularMovies from '../components/PopularMovies';
import TopRatedMovies from '../components/TopRatedMovies';
import ViewTrailer from '../components/ViewTrailer';

const Home = ({ selectMovie, movies, trailer, playing, setPlaying, movie, IMAGE_PATH, popularMovies, topRatedMovies, fetchPopularMovies, fetchTopRatedMovies, fetchMoviesByGenre, genres }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFirstMovieSelected, setIsFirstMovieSelected] = useState(false); // Nuevo estado para controlar la selección de la primera película

  // Referencias Películas Populares y Mejor Rankeadas
  const popularMoviesRef = useRef(null);
  const topRatedMoviesRef = useRef(null);

  useEffect(() => {
    setFilteredMovies(movies);
    if (movies.length > 0 && !isFirstMovieSelected) {
      selectMovie(movies[0]); // Selecciona automáticamente la primera película
      setIsFirstMovieSelected(true); // Marca que la primera película ya ha sido seleccionada
    }
  }, [movies, selectMovie, isFirstMovieSelected]);

  useEffect(() => {
    if (movie) {
      document.body.style.backgroundImage = `url("${IMAGE_PATH}${movie.backdrop_path}")`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  }, [movie, IMAGE_PATH]);

  const fetchMoviesByCategory = async (categoryId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${categoryId}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer 2bd4cead62c3c6f2bfcfd7e8997bc617'
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching movies by category: ${response.status}`);
      }

      const data = await response.json();
      setFilteredMovies(data.results);
      if (data.results.length > 0) {
        selectMovie(data.results[0]); // Selecciona automáticamente la primera película de los resultados
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearchSubmit = (searchKey) => {
    // Implementa la lógica de búsqueda aquí
    console.log("Search submitted:", searchKey);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <div>
        <main>
          {movie && (
            <ViewTrailer
              movie={movie}
              trailer={trailer}
              playing={playing}
              setPlaying={setPlaying}
              IMAGE_PATH={IMAGE_PATH}
            />
          )}
        </main>

        <div className='container mx-auto mt-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} URL_IMAGE={IMAGE_PATH} />
            ))}
          </div>
        </div>
        <div ref={popularMoviesRef} className='container mx-auto mt-12'>
          <PopularMovies movies={popularMovies} selectMovie={selectMovie} URL_IMAGE={IMAGE_PATH} />
        </div>
        <div ref={topRatedMoviesRef} className='container mx-auto mt-12'>
          <TopRatedMovies movies={topRatedMovies} selectMovie={selectMovie} URL_IMAGE={IMAGE_PATH} />
        </div>
      </div>
    </div>
  );
};

export default Home;