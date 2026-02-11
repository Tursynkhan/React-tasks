import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  onLogout(): void;
}
export default function Logout({ onLogout }: LogoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
}
