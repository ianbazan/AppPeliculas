import React from 'react';
import { Drawer, List, ListItem, ListItemText, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

const Sidebar = ({ isOpen, selectCategory, fetchPopularMovies, fetchTopRatedMovies, genres, toggleSidebar }) => {
  const handleCategorySelect = (categoryId) => {
    selectCategory(categoryId);
    toggleSidebar(); // Cierra el sidebar después de seleccionar una categoría
  };

  return (
    <StyledDrawer anchor="left" open={isOpen} onClose={toggleSidebar}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <IconButton onClick={toggleSidebar} className="close-button">
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
          <Typography variant="h5" component="div" className="sidebar-title">
            Pilecola
          </Typography>
        </div>
        <Typography variant="h6" component="div" style={{ padding: '16px', color: 'white' }}>
          Categorías
        </Typography>
        <List>
          {genres && genres.map((genre) => (
            <StyledListItem button key={genre.id} onClick={() => handleCategorySelect(genre.id)}>
              <ListItemText primary={genre.name} />
            </StyledListItem>
          ))}
        </List>
        <Typography variant="h6" component="div" style={{ padding: '16px', color: 'white' }}>
          Populares
        </Typography>
        <Button fullWidth onClick={() => { fetchPopularMovies(); toggleSidebar(); }}>
          Peliculas Populares
        </Button>
        <Typography variant="h6" component="div" style={{ padding: '16px', color: 'white' }}>
          Mejor Rankeadas
        </Typography>
        <Button fullWidth onClick={() => { fetchTopRatedMovies(); toggleSidebar(); }}>
          Peliculas Mejor Rankeadas
        </Button>
      </div>
    </StyledDrawer>
  );
};

const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    background-color: #151515; // Fondo sin transparencia
    overflow: hidden; // Oculta la barra de desplazamiento
  }

  .sidebar-content {
    width: 250px;
    height: 100%;
    overflow-y: auto; // Permite el desplazamiento interno sin mostrar la barra de desplazamiento
    scrollbar-width: none; // Oculta la barra de desplazamiento en Firefox
    -ms-overflow-style: none; // Oculta la barra de desplazamiento en IE y Edge
  }

  .sidebar-content::-webkit-scrollbar {
    display: none; // Oculta la barra de desplazamiento en Chrome, Safari y Opera
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    padding: 16px;
  }

  .sidebar-title {
    color: white;
    margin-left: 8px;
  }

  .close-button {
    color: white;
    margin-right: 8px;
  }
`;

const StyledListItem = styled(ListItem)`
  && {
    color: white; // Cambia el color del texto a blanco
    &:hover {
      background-color: rgba(168, 168, 168, 0.2); // Cambia el fondo al pasar el mouse con transparencia del 50%
    }
  }
`;

export default Sidebar;