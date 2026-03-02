import React from 'react';
import LoginForm, {
  type LoginFormRef,
} from '@/features/auth/login/ui/LoginForm';
import Dialog from '@/shared/ui/Dialog/Dialog';
import { Button } from '@mui/material';
import { COLORS } from '@/shared/config/theme/palette';

export default function LoginPage() {
  const formRef = React.useRef<LoginFormRef>(null);

  const handleReset = () => {
    formRef.current?.reset();
  };

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      title="Login"
      actions={
        <>
          <Button
            variant="outlined"
            onClick={handleReset}
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
        </>
      }
    >
      <LoginForm ref={formRef} />
    </Dialog>
  );
}
