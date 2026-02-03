import { SearchCourses } from '@/features/courses';
import { AddNewCourses } from '@/features/courses';
import { Box } from '@mui/material';

interface SearchBarProps {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}
export default function SearchBar({
  query,
  onChange,
  onClick,
}: SearchBarProps) {
  return (
    <Box component={'div'} display={'flex'} justifyContent={'space-between'}>
      <SearchCourses onChange={onChange} onClick={onClick} query={query} />
      <AddNewCourses />
    </Box>
  );
}
