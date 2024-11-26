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
          placeholder="Search"
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
    width: 500px; // Ajusta el ancho del input a 500px
    .MuiInputBase-root {
      color: white; // Cambia el color del texto a blanco
    }
    .MuiInput-underline:before {
      border-bottom: 1px solid white; // Cambia el color de la barra inferior a blanco
    }
    .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom: 2px solid white; // Cambia el color de la barra inferior al pasar el mouse a blanco
    }
    .MuiInput-underline:after {
      border-bottom: 2px solid white; // Cambia el color de la barra inferior activa a blanco
    }
  }
`;

export default Search;