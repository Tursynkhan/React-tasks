import LoginForm from '@/features/auth/login/ui/LoginForm';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS } from '@/shared/config/theme/palette';
export default function LoginPage() {
  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: COLORS.bg,
          color: COLORS.white,
          textTransform: 'uppercase',
        }}
      >
        Login
      </DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          top: 18,
          right: 18,
          color: COLORS.muted,
          '&:hover': { color: COLORS.white },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          bgcolor: COLORS.bg,
        }}
      >
        <LoginForm />
      </DialogContent>
      <DialogActions sx={{ bgcolor: COLORS.bg }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: COLORS.accent,
            color: COLORS.accent,
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          disableElevation
          type="submit"
          form="login-form"
          sx={{
            bgcolor: COLORS.accent,
            color: COLORS.white,
            textTransform: 'uppercase',
          }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
