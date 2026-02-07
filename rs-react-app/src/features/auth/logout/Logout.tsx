import Button from '@mui/material/Button';

interface LogoutProps {
  onLogout(): void;
}
export default function Logout({ onLogout }: LogoutProps) {
  return (
    <Button variant="contained" onClick={onLogout}>
      Logout
    </Button>
  );
}
