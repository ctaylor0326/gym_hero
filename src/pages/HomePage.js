import React from "react";
import { Paper, Box, Stack, Button, Typography } from "@mui/material";
import backgroundImage from "../assets/BannerImage.png"

const HomePage = () => {
  return (
    <Paper
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: { lg: "35%", sm: "50%", xs: "50%" },
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
        paddingBottom: "80px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { lg: "100px", sm: "65px", xs: "30px" },
          fontWeight: "400px",
          color: "orange",
        }}
      >
        Welcome to My App
      </Typography>
      <Stack
        direction="row"
        sx={{
          backgroundColor: "orangered",
          display: "flex",
          width: "50%",
          height: "10%",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1, mb: 1, width: "35%" }}
        >
          LOGIN
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 1, mb: 1, width: "35%" }}
        >
          SIGNUP
        </Button>
      </Stack>
    </Paper>
  );
};

export default HomePage;
