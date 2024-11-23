import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSWR from 'swr';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import { UserContext } from './context/UserContext';
import Header from './components/Header';
import ScrollToTopButton from './components/ScrollToTopButton';
import './App.css';
import './index.css';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

// Función fetcher para usar en SWR
const fetcher = (url) => fetch(url).then(res => res.json());

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YThkZWUyNDA3MjEzMGQyMDFmODc5ZDExZjViMDIzYyIsIm5iZiI6MTczMTk2MjAyOC44MDEyMjQyLCJzdWIiOiI2NjRkNGM5MmQzY2U5MWEzMDk3YjJhZjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AyhYAW-IhUo3k-GBiU5T83kHG9skLdW8AfZ4n6qZ1AA'
  }
};

function App() {
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const { user, logout } = useContext(UserContext);

  // Fetch de películas por búsqueda (SWR)
  const { data: movies, error: movieError, isLoading: movieLoading } = useSWR(
    `${API_URL}discover/movie?api_key=${API_KEY}`, 
    fetcher
  );

  // Fetch de géneros (SWR)
  const { data: genreData } = useSWR(`${API_URL}genre/movie/list?api_key=${API_KEY}`, fetcher);
  const genres = genreData?.genres || [];

  // Fetch de películas populares (SWR)
  const { data: popularData } = useSWR(`${API_URL}movie/popular?api_key=${API_KEY}`, fetcher);
  const popularMovies = popularData?.results || [];

  // Fetch de películas mejor rankeadas (SWR)
  const { data: topRatedData } = useSWR(`${API_URL}movie/top_rated?api_key=${API_KEY}`, fetcher);
  const topRatedMovies = topRatedData?.results || [];

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 1500) { 
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const selectMovie = (selectedMovie) => {
    fetchMovieDetails(selectedMovie.id);
    setMovie(selectedMovie);
    window.scrollTo(0, 0);
  };

  const fetchMovieDetails = useCallback(async (id) => {
    const url = `${API_URL}movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
    const data = await fetcher(url);
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  }, []);

  const handleSearchSubmit = (searchKey) => {
    setSearchKey(searchKey);
  };

  if (movieLoading) return <div>Loading movies...</div>;
  if (movieError) return <div>Error loading movies</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header handleSearchSubmit={handleSearchSubmit}/>
      <Routes>
        <Route path="/" element={
          <Home
            selectMovie={selectMovie}
            movies={movies?.results || []}
            trailer={trailer}
            playing={playing}
            setPlaying={setPlaying}
            movie={movie}
            IMAGE_PATH={IMAGE_PATH}
            popularMovies={popularMovies}
            topRatedMovies={topRatedMovies}
            genres={genres}
          />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites selectMovie={selectMovie} />} />
      </Routes>
      <ScrollToTopButton showScrollButton={showScrollButton} scrollToTop={scrollToTop} />
    </div>
  );
}

export default App;