import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Container, Typography, Box, Grid, Alert } from "@mui/material";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [formattedNumber, setFormattedNumber] = useState();
  const [timeoutMessage, setTimeoutMessage] = useState("");

  const formatPhoneNumber = (number) => {
    const parsedNumber = parsePhoneNumberFromString(number);
    return parsedNumber.formatInternational();
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.phoneNumber) {
      const formattedNum = formatPhoneNumber(user.phoneNumber);
      setFormattedNumber(formattedNum);
    }

    const timer = setTimeout(() => {
      toast.warning("Session timed out");
      setTimeoutMessage("Session timed out");
      navigate("/login");
    }, 60000);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  const handleEdit = () => {
    navigate("/edit-profile", { state: { user } });
  };

  const handleDelete = () => {
    const registeredAccounts =
      JSON.parse(localStorage.getItem("registeredAccounts")) || [];
    const updatedAccounts = registeredAccounts.filter(
      (account) => account.email !== user.email
    );
    localStorage.setItem("registeredAccounts", JSON.stringify(updatedAccounts));
    toast.success("Deleted user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Container component="main" maxWidth="sm">
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
          variant="h4"
          style={{ color: user.favoriteColor }}
        >
          {user.name}'s Profile
        </Typography>
        {timeoutMessage && <Alert severity="warning">{timeoutMessage}</Alert>}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Email:</Typography>
              <Typography>{user.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Phone Number:</Typography>
              <Typography>{formattedNumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Favorite Color:</Typography>
              <Typography>{user.favoriteColor}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Password:</Typography>
              <Typography>{user.password}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
