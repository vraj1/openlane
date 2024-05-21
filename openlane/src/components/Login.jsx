import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Typography, Box, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

  const handleLogin = (e) => {
        e.preventDefault();
        const registeredAccounts = JSON.parse(localStorage.getItem('registeredAccounts')) || [];

        const user = registeredAccounts.find(account => account.email === email && account.password === password);

        if (user) {
            setError('');
            navigate('/profile', { state: { user } });
        } else {
            setError('No user with these credentials is found. Please try again');
        }
    };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
      <StyledForm onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </StyledButton>
        <Grid container>
          <Grid item>
            <Link to="/signup">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </StyledForm>
    </StyledContainer>
  );
}

export default Login;
