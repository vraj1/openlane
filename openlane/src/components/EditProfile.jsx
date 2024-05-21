import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  parsePhoneNumberFromString,
  formatPhoneNumber,
} from "libphonenumber-js";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhoneNumber,
  validateColour,
  checkUserDoesNotExist,
} from "../util";

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;

  const [isSubmitting, setisSubmitting] = useState(false);
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || null);
  const [favoriteColor, setFavoriteColor] = useState(user.favoriteColor);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [colourError, setColourError] = useState(false);

  const resetErrors = () => {
    setEmailError(false);
    setColourError(false);
    setNameError(false);
    setPasswordError(false);
    setPhoneError(false);
  };

  const validateForm = () => {
    resetErrors();
    const userExists = checkUserDoesNotExist(email);
    const isEmailValid = validateEmail(email);
    const isNameValid = validateName(fullName);
    const isPasswordValid = validatePassword(password);
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    const isColourValid = validateColour(favoriteColor);

    if (!isEmailValid) {
      setEmailError(
        "Please enter a valid email that follows the format test@example.com"
      );
    }
    if (email !== user.email) {
      if (!userExists) {
        setEmailError("This user already exists please enter another email");
      }
    }

    if (!isNameValid) {
      setNameError("Name must be longer than 3 characters");
    }
    if (!isPasswordValid) {
      setPasswordError(
        "Password must be between 10-32 characters, with 2 uppercase letters, 2 numbers and 1 special character"
      );
    }
    if (!isPhoneNumberValid) {
      setPhoneError(
        "Please enter a valid phone number such as +1 561 512 8712, please add an area code. Begin with a + followed by the area code"

      );
    }
    if (!isColourValid) {
      setColourError(true);
    }
    return (
      (isEmailValid || userExists) &&
      isNameValid &&
      isPasswordValid &&
      isPhoneNumberValid &&
      isColourValid
    );
  };

  const handleSave = () => {
    setisSubmitting(true);
    const validForm = validateForm();

    if (!validForm) {
      setisSubmitting(false);
      return;
    }
    const updatedUser = {
      ...user,
      name: fullName,
      email,
      password,
      phoneNumber,
      favoriteColor,
    };
    let registeredAccounts =
      JSON.parse(localStorage.getItem("registeredAccounts")) || [];

    registeredAccounts = registeredAccounts.map((account) =>
      account.email === user.email ? updatedUser : account
    );

    localStorage.setItem(
      "registeredAccounts",
      JSON.stringify(registeredAccounts)
    );
    setisSubmitting(false);
    toast.success("Information saved successful!");
    navigate("/profile", { state: { user: updatedUser } });
  };

  const handleCancel = () => {
    navigate("/profile", { state: { user } });
  };

  const colors = [
    "blue",
    "red",
    "green",
    "yellow",
    "purple",
    "black",
    "orange",
  ];

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          style={{ color: favoriteColor }}
        >
          Edit {user?.name} Profile
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            autoFocus
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={nameError}
            helperText={nameError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError}
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
            error={passwordError}
            helperText={passwordError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            autoComplete="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={phoneError}
            helperText={phoneError}
          />
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              //required
              fullWidth
              select
              label="Favorite Color"
              value={favoriteColor}
              onChange={(e) => setFavoriteColor(e.target.value, "colour")}
              error={colourError}
              helperText={"Please select a colour"}
            >
              {colors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default EditProfile;
