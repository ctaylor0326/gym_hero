import React, { useState, useContext, useEffect } from "react";
import { Paper, Modal, Box, Stack, Button, Typography } from "@mui/material";
import backgroundImage from "../assets/BannerImage.png";
import RegisterUser from "../components/RegisterUser";
import LoginForm from "../components/LoginForm";
import { UserContext } from "../context/User";

const HomePage = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUser(null);
    }
  }, []);

  console.log(user);

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
        Gym Hero
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
          onClick={handleOpenLogin}
          variant="contained"
          color="primary"
          sx={{ mt: 1, mb: 1, width: "35%" }}
        >
          LOGIN
        </Button>
        <LoginForm openLogin={openLogin} setOpenLogin={setOpenLogin} />
        <Button
          onClick={handleOpenRegister}
          variant="contained"
          color="secondary"
          sx={{ mt: 1, mb: 1, width: "35%" }}
        >
          SIGNUP
        </Button>
        <RegisterUser
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
        />
      </Stack>
    </Paper>
  );
};

export default HomePage;
