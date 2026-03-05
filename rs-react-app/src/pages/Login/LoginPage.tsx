import React from 'react';
import { LoginForm, type LoginFormRef } from '@/features/auth/login';
import { Dialog, Button } from '@/shared/ui';

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
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" type="submit" form="login-form">
            Login
          </Button>
        </>
      }
    >
      <LoginForm ref={formRef} />
    </Dialog>
  );
}
