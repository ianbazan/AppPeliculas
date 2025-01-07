import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IconButton, Button, Drawer, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Sidebar from './Sidebar';
import Search from '../common/Search';
import styled from 'styled-components';

const Header = ({ handleSearchSubmit, genres, fetchPopularMovies, fetchTopRatedMovies, fetchMoviesByGenre }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <header className="p-6 flex justify-between items-center bg-transparent absolute top-0 left-0 w-full z-10">
      <div className="flex items-center">
        <IconButton onClick={toggleSidebar} className="text-white">
          <MenuIcon style={{ color: 'white' }} />
        </IconButton>
        <StyledLink to="/" className="text-white text-2xl ml-2">
          Pilecola
        </StyledLink>
      </div>
      <div className="flex-grow mx-6 flex justify-center">
        <Search handleSearchSubmit={handleSearchSubmit} />
      </div>
      <div>
        <IconButton onClick={handleMenuOpen} className="text-white">
          <AccountCircleIcon style={{ color: 'white' }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuClick('/login')}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Iniciar Sesión" />
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('/register')}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Registrarse" />
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('/favorites')}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Favoritos" />
          </MenuItem>
        </Menu>
      </div>
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <Sidebar 
          isOpen={isSidebarOpen} // Pasa isOpen como prop
          selectCategory={fetchMoviesByGenre} 
          fetchPopularMovies={fetchPopularMovies} 
          fetchTopRatedMovies={fetchTopRatedMovies} 
          genres={genres} 
          toggleSidebar={toggleSidebar} // Pasa la función toggleSidebar
        />
      </Drawer>
    </header>
  );
};

const StyledLink = styled(Link)`
  && {
    display: block; // Ensure the title is displayed by default
  }

  @media (max-width: 480px) {
    && {
      display: none; // Hide the title on small screens
    }
  }
`;

export default Header;