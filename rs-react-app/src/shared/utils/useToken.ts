import React from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString ? JSON.parse(tokenString) : null;
  };
  const getUsername = () => {
    const usernameString = localStorage.getItem('username');
    return usernameString ? JSON.parse(usernameString) : null;
  };
  const [token, setToken] = React.useState(getToken());
  const [username, setUsername] = React.useState(getUsername());

  const saveAuth = (userToken: string, userName: string) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('username', JSON.stringify(userName));
    setToken(userToken);
    setUsername(userName);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  };

  return { token, username, setAuth: saveAuth, removeToken };
}
