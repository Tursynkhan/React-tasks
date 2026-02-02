import { Button } from '@mui/material';
import Input from '@mui/material/Input';

export default function SearchCourses() {
  return (
    <div className="searchBar">
      <Input placeholder="Search courses" color="primary" />
      <Button variant="contained">Search</Button>
    </div>
  );
}
