import React, { useEffect, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../utils/user';
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#121212',
        },
        text: {
            primary: '#ffffff',
        },
    },
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://lendi.org/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Signin() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.users);
    const memoizedUser = useMemo(() => user, [user]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const reg_no = data.get("email")
      const password = data.get("password");

      dispatch(login(reg_no));

      try {
        const response = await fetch("http://127.0.0.1:8000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: reg_no,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.message);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    useEffect(() => {
        if (memoizedUser) {
            console.log("Updated user state:", memoizedUser);
        }
    }, [memoizedUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    backgroundColor: '#171b2d',
                    borderRadius: 1,
                    padding: 3,
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="#ffffff">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Registration Number"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            
        </ThemeProvider>
    );
}


export default Signin;
