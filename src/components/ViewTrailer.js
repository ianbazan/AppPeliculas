import React from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';

const ViewTrailer = ({ movie, trailer, playing, setPlaying, IMAGE_PATH }) => {
  return (
    <div
      className="viewtrailer"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url("${IMAGE_PATH}${movie.backdrop_path}")`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 2000px 0 2000px -900px rgba(0, 0, 0, 0.7), inset 0 -20px 20px -20px rgba(0, 0, 0, 0.7)',
      }}
    >
      {playing ? (
        <>
          <YouTube
            videoId={trailer?.key}
            className='reproductor'
            containerClassName={"youtube-container"}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 1,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
          <button onClick={() => setPlaying(false)} className='boton close-button absolute left-12' style={{ zIndex: 1000 }}>
            <FontAwesomeIcon icon={faTimes} size="2x" color="white" />
          </button>
        </>
      ) : (
        <div className="container px-4" style={{ position: 'absolute', bottom: '5%', left: '2%', textAlign: 'left', maxWidth: '1000px', width: '90%' }}>
          <div>
            {trailer ? (
              <button
                className='boton play-button'
                onClick={() => setPlaying(true)}
                type='button'
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