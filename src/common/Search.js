import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

const Search = ({ handleSearchSubmit }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(searchValue);
  };

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} className="search-header" aria-label="Search Form">
        <StyledTextField
          variant="standard"
          placeholder=""
          value={searchValue}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton type="submit" aria-label="Search Button">
                <SearchIcon style={{ color: 'white' }} />
              </IconButton>
            ),
          }}
        />
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .search-header {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%; // Default to 100% width
    max-width: 500px; // Maximum width of 500px
    .MuiInputBase-root {
      color: white; // Cambia el color del texto a blanco
    }
    .MuiInput-underline:before {
      border-bottom: 1px solid white; // Cambia el color de la barra inferior a blanco
    }
    .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom: 1px solid white; // Cambia el color de la barra inferior al pasar el mouse a blanco
    }
    .MuiInput-underline:after {
      border-bottom: 1px solid white; // Cambia el color de la barra inferior activa a blanco
    }

    @media (max-width: 1200px) {
      max-width: 400px; // Adjust width for laptops
    }

    @media (max-width: 768px) {
      max-width: 300px; // Adjust width for tablets
    }

    @media (max-width: 480px) {
      max-width: 100%; // Adjust width for mobile devices
    }
  }
`;

export default Search;