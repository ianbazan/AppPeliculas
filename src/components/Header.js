import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IconButton, Button, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '../common/Search';
import styled from 'styled-components';

const Header = ({ handleSearchSubmit, genres, fetchPopularMovies, fetchTopRatedMovies, fetchMoviesByGenre }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="p-6 flex justify-between items-center bg-transparent absolute top-0 left-0 w-full z-10">
      <div className="flex items-center">
        <IconButton onClick={toggleSidebar} className="text-white">
          <MenuIcon style={{ color: 'white' }} />
        </IconButton>
        <Link to="/" className="text-white text-2xl ml-2">
          Pilecola
        </Link>
      </div>
      <div className="flex-grow mx-6 flex justify-center">
        <Search handleSearchSubmit={handleSearchSubmit} />
      </div>
      <div>
        <StyledButton 
          variant="text" 
          onClick={() => navigate('/login')}
        >
          Iniciar Sesión
        </StyledButton>
      </div>
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <div style={{ width: 250 }}>
          <Typography variant="h6" component="div" style={{ padding: '16px' }}>
            Categorías
          </Typography>
          <List>
            {genres && genres.map((genre) => (
              <ListItem button key={genre.id} onClick={() => fetchMoviesByGenre(genre.id)}>
                <ListItemText primary={genre.name} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" component="div" style={{ padding: '16px' }}>
            Populares
          </Typography>
          <Button fullWidth onClick={fetchPopularMovies}>
            Peliculas Populares
          </Button>
          <Typography variant="h6" component="div" style={{ padding: '16px' }}>
            Mejor Rankeadas
          </Typography>
          <Button fullWidth onClick={fetchTopRatedMovies}>
            Peliculas Mejor Rankeadas
          </Button>
        </div>
      </Drawer>
    </header>
  );
};

const StyledButton = styled(Button)`
  && {
    color: white;
    &:hover {
      background-color: transparent;
      text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.7);
    }
  }
`;

export default Header;