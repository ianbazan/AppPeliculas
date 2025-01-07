import React from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const ViewTrailer = ({ movie, trailer, playing, setPlaying, IMAGE_PATH }) => {
  return (
    <div
      className="viewtrailer"
      style={{
        backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        boxShadow: 'inset 2000px 0 2000px -1200px rgba(0, 0, 0, 0.7), inset 0 -20px 20px -20px rgba(0, 0, 0, 0.7)',
      }}
    >
      {playing ? (
        <>
          <YouTube
            videoId={trailer?.key}  // Asegurando que trailer tenga valor
            className='reproductor container mx-auto'
            containerClassName={"youtube-container"}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
          />
          <button onClick={() => setPlaying(false)} className='boton'>
            Close
          </button>
        </>
      ) : (
        <div className="container mx-auto px-4 py-8" style={{ position: 'absolute', top: '80%', left: '2%', transform: 'translateY(-50%)', textAlign: 'left', maxWidth: '1400px', width: '90%' }}>
          <div>
            {trailer ? (
              <button
                className='boton bg-black text-white px-4 py-2 rounded'
                onClick={() => setPlaying(true)}
                type='button'
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                <FontAwesomeIcon icon={faPlay} size="2x" color="white" />
              </button> 
            ) : (
              "Disculpa, no hay trailer"
            )}
            <h1 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>{movie.title}</h1>
            <p className='text-white mt-4 text-sm sm:text-base md:text-lg lg:text-xl'>{movie.overview}</p>
            <p className='text-white mt-2 text-sm sm:text-base md:text-lg lg:text-xl'>Calificación: {movie.vote_average}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTrailer;