import React from 'react';
import { Button, Box } from '@mui/material';
import SearchInput from '@/shared/ui/SearchInput/SearchInput';
import { useSearchParams } from 'react-router-dom';

export default function SearchMovie() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = React.useState(
    searchParams.get('q') || ''
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newSearchParams.set('q', searchInput);
    } else {
      newSearchParams.delete('q');
    }
    setSearchParams(newSearchParams);
  };

  return (
    <Box
      component="div"
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      gap={{ xs: 1, sm: 2 }}
      width={{ xs: '100%', sm: 'auto' }}
    >
      <SearchInput
        placeholder="What do you want to watch?"
        value={searchInput}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        onClick={handleOnClick}
        sx={{ minWidth: { xs: '100%', sm: 100 } }}
      >
        Search
      </Button>
    </Box>
  );
}
