import React from 'react';

interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}

export function useLoginValidation() {
  const [error, setError] = React.useState<LoginErrors>({});

  const validateForm = (username: string, password: string) => {
    if (!username || !password) {
      setError({ general: 'Both fields are required' });
      return false;
    }
    if (username.length <= 3 || username.length >= 20) {
      setError({ username: 'Username must be between 3 and 20 characters' });
      return false;
    }
    if (password.length <= 8 || password.length >= 50) {
      setError({ password: 'Password must be between 8 and 50 characters' });
      return false;
    }
    setError({});
    return true;
  };

  const setGeneralError = (message: string) => {
    setError({ general: message });
  };

  return { error, validateForm, setGeneralError };
}
