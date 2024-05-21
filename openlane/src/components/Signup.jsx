import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, Button, TextField, Grid, Typography, MenuItem, Box, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import { validateEmail, validatePassword, validateName, validatePhoneNumber, validateColour, checkUserDoesNotExist } from '../util';

const StyledBox = styled(Box)(({ theme }) => ({
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
//   width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');

  //error states
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [colourError, setColourError] = useState(false);

  const navigate = useNavigate();


  const setFormElement = (e, id) =>{

    switch(id){
        case('fullName'):
            setFullName(e);
            break;
        case('email'):
            setEmail(e);
            break;
        case('password'):
            setPassword(e);
            break;
        case('number'):
        
            const matchWithCountryCode = e.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
            const matchWithoutCountryCode = e.match(/^(\d{3})(\d{3})(\d{4})$/);
        
            if (matchWithCountryCode) {
            setPhoneNumber(`+${matchWithCountryCode[1]} ${matchWithCountryCode[2]} ${matchWithCountryCode[3]} ${matchWithCountryCode[4]}`);
            break;
            } else if (matchWithoutCountryCode) {
            setPhoneNumber(`+1 ${matchWithoutCountryCode[1]} ${matchWithoutCountryCode[2]} ${matchWithoutCountryCode[3]}`);
            break;
            }
            
            setPhoneNumber(e);
            break;

           
        case('colour'):
        console.log('COLOUR', e)
            setFavoriteColor(e);
            break;
        default:
            return;
    }

  }

  const resetErrors = () => {
    setEmailError(false);
    setColourError(false);
    setNameError(false);
    setPasswordError(false);
    setPhoneError(false);
  }

    const validateForm = () => {
        resetErrors(); 
        const userExists = checkUserDoesNotExist(email)
        const isEmailValid = validateEmail(email);
        const isNameValid = validateName(fullName);
        const isPasswordValid = validatePassword(password);
        const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
        const isColourValid = validateColour(favoriteColor);
        console.log('colour valid', isColourValid)
        if(!isEmailValid){
            setEmailError('Please enter a valid email that follows the format test@example.com');
        }
        if(!userExists){
            setEmailError('This user already exists please enter another email');
        }
        if(!isNameValid){
            setNameError('Name must be longer than 3 characters');
        }
        if(!isPasswordValid){
            setPasswordError('Password must be between 10-32 characters, with 2 uppercase letters, 2 numbers and 1 special character');
        }
        if(!isPhoneNumberValid){
            setPhoneError('Please enter a valid phone number such as +1 561 512 8712');
        }
        if(!isColourValid){
            console.log('not valid colour')
            setColourError(true);
        }
        return isEmailValid && userExists && isNameValid &&  isPasswordValid && isPhoneNumberValid && isColourValid
    }

    

  const handleSubmit = (e) => {
    e.preventDefault();
    //resetErrors();
    const validForm = validateForm();
   

    console.log('colourERR',colourError)
    if(!validForm){
        console.log('Fix errors');
        return;
    }
    else{
        console.log('Read to Sbumit')

        const newAccount = {name: fullName, email: email, password: password, phoneNumber: phoneNumber, favoriteColor: favoriteColor }
        const registeredAccounts = JSON.parse(localStorage.getItem('registeredAccounts'));
        if(registeredAccounts){
            const addedAccounts = [...registeredAccounts, newAccount];
            console.log(addedAccounts)
            localStorage.setItem('registeredAccounts', JSON.stringify(addedAccounts));
        }else{
            const newUsers = [newAccount]
            localStorage.setItem('registeredAccounts', JSON.stringify(newUsers));
        }
        // resetErrors();
        toast.success('Signup Successfull!');
        navigate('/profile', { state: { user: newAccount } });
        
    }

  };

  const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'black', 'orange'];

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                value={fullName}
                onChange={(e) => setFormElement(e.target.value, "fullName")}
                error={nameError}
                helperText={nameError}
              />
            </Grid>
            
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setFormElement(e.target.value, "email")}
                error={emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setFormElement(e.target.value, "password")}
                error={passwordError}
                helperText={passwordError}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="phoneNumber"
                label="Phone Number (optional)"
                type="tel"
                id="phoneNumber"
                autoComplete="tel"
                value={phoneNumber}
                onChange={(e) => setFormElement(e.target.value, "number")}
                error={phoneError}
                helperText={phoneError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                //required
                fullWidth
                select
                label="Favorite Color"
                value={favoriteColor}
                onChange={(e) => setFormElement(e.target.value, "colour")}
                error={colourError}
                helperText={'Please select a colour'}
              >
                {colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          
          <StyledButton type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </StyledButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledBox>
    </Container>
  );
}

export default Signup;
