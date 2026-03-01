import React from 'react';
import { Button, Box } from '@mui/material';
import SearchInput from '@/shared/ui/SearchInput/SearchInput';
import { useSearchParams } from 'react-router-dom';
import { COLORS } from '@/shared/config/theme/palette';

export default function SearchMovie() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = React.useState(
    searchParams.get('search') || ''
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newSearchParams.set('search', searchInput);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSearch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
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
        onKeyDown={handleKeyDown}
        sx={{
          bgcolor: '#323232',
          color: COLORS.white,
          borderRadius: '4px',
          fontSize: 16,
          '& input::placeholder': { color: COLORS.muted, opacity: 1 },
        }}
      />
      <Button
        variant="contained"
        onClick={handleOnClick}
        sx={{
          bgcolor: COLORS.accent,
          color: COLORS.white,
          textTransform: 'uppercase',
          borderRadius: '4px',
        }}
      >
        Search
      </Button>
    </Box>
  );
}
