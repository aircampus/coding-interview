import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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
        Find your bike
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ReportPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/report", {
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

  const handleChangeFirstname = (event) => {
    event.preventDefault();
    setFirstname(event.target.value);
  };
  const handleChangeLastname = (event) => {
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

  console.log(firstname, lastname, email, adress, serialNumber);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <DirectionsBikeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signaler un vol
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="Prénom"
                onChange={handleChangeFirstname}
                autoFocus
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="lastname"
                fullWidth
                id="lastname"
                label="Nom"
                onChange={handleChangeLastname}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={handleChangeEmail}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="adress"
                label="Adresse"
                name="adress"
                onChange={handleChangeAdress}
                autoComplete="adresse"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="serialNumber"
                label="Numéro de série du vélo"
                id="serialNumber"
                onChange={handleChangeSerialNumber}
                autoComplete="000000"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Signaler mon vélo
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
