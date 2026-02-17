import LoginForm from '@/features/auth/login/ui/LoginForm';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

export default function LoginPage() {
  return (
    <Dialog open={true}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <LoginForm />
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cancel</Button>
        <Button color="primary" type="submit" form="login-form">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
