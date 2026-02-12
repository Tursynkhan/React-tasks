import { Button, Box } from '@mui/material';
import SearchInput from '@/shared/ui/SearchInput/SearchInput';

interface SearchCoursesProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  query: string;
}
export default function SearchCourses({
  onChange,
  onClick,
  query,
}: SearchCoursesProps) {
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
        placeholder="Search courses"
        value={query}
        onChange={onChange}
      />
      <Button
        variant="contained"
        onClick={onClick}
        sx={{ minWidth: { xs: '100%', sm: 100 } }}
      >
        Search
      </Button>
    </Box>
  );
}
