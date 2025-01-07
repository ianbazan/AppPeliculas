// src/components/PopularMovies.js
import React from 'react';
import Slider from "react-slick"; // Importa el componente Slider de react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PopularMovies = ({ movies, selectMovie, URL_IMAGE }) => {
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Películas Populares</h2>
      <Slider {...sliderSettings}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative cursor-pointer px-2"
            onClick={() => selectMovie(movie)}
          >
            <img
              src={`${URL_IMAGE}${movie.poster_path}`}
              alt={movie.title}
              className="rounded shadow-md"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 text-center text-sm rounded-b">
              {movie.title}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularMovies;
