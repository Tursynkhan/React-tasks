import React from 'react';
import { Box, FormControl, FormLabel, TextField, Button } from '@mui/material';
import { loginApi } from '../api/loginApi';

type LoginFormProps = {
  onLogin: (token: string, username: string) => void;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginApi(username, password);

      if (!response?.accessToken) {
        throw new Error('Invalid login response');
      }
      onLogin(response.accessToken, response.username || username);
    } catch (error) {
      console.error('Login failed:', error);
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
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
}
