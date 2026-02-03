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
    <Box component="div" display="flex" alignItems="center" gap={2}>
      <SearchInput
        placeholder="Search courses"
        value={query}
        onChange={onChange}
      />
      <Button variant="contained" onClick={onClick}>
        Search
      </Button>
    </Box>
  );
}
