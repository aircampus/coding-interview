import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/Navbar";

const theme = createTheme();

export default function Report() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  console.log(firstname, lastname, email, adress, serialNumber);

  const handleChangeFirstname = (event) => {
    event.preventDefault();
    setFirstname(event.target.value);
  };

  const handleChangeName = (event) => {
    event.preventDefault();
    setLastname(event.target.value);
  };

  const handleChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleChangeAdress = (event) => {
    event.preventDefault();
    setAdress(event.target.value);
  };

  const handleChangeSerialNumber = (event) => {
    event.preventDefault();
    setSerialNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3005/report", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        adress,
        serialNumber,
      }),
    }).then((result) => {
      console.log(result);
    });
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ position: 'relative', width: "50%" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Signaler un vol de vélo
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Prénom"
                    autoFocus
                    onChange={handleChangeFirstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Nom"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleChangeName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChangeEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="adress"
                    label="Adresse"
                    type="adress"
                    id="adress"
                    autoComplete="adresse"
                    onChange={handleChangeAdress}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="serialNumber"
                    label="Numero de série du vélo"
                    type="serialNumber"
                    id="serialNumber"
                    autoComplete="0100111101111"
                    onChange={handleChangeSerialNumber}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Enregistrer
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Stolen Bike
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
