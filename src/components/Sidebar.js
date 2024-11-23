import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const Sidebar = ({ selectCategory, fetchPopularMovies, fetchTopRatedMovies, genres }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'} Menu
      </Button>
      <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
        <div style={{ width: 250 }}>
          <Typography variant="h6" component="div" style={{ padding: '16px' }}>
            Categorías
          </Typography>
          <List>
            {genres && genres.map((genre) => (
              <ListItem button key={genre.id} onClick={() => selectCategory(genre.id)}>
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
    </div>
  );
};

export default Sidebar;