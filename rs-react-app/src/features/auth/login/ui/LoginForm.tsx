import React from 'react';
import { Box, FormControl, FormLabel, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/loginApi';
import { useLoginValidation } from '@/shared/utils/hooks';

type LoginFormProps = {
  onLogin: (token: string, username: string) => void;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { error, validateForm, setGeneralError } = useLoginValidation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm(username, password)) {
      return;
    }
    try {
      const response = await loginApi(username, password);

      if (!response?.accessToken) {
        throw new Error('Invalid login response');
      }
      onLogin(response.accessToken, response.username || username);
      navigate('/courses');
    } catch (error) {
      console.error('Login failed:', error);
      setGeneralError('Login failed. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
    >
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <TextField
          id="username"
          type="text"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={!!error.username}
          helperText={error.username}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          id="password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={!!error.password}
          helperText={error.password}
        />
      </FormControl>
      {error.general && (
        <Box color="error.main" textAlign="center">
          {error.general}
        </Box>
      )}
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
}
