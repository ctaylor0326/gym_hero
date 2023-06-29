import React, { useState, useContext, useEffect } from "react";
import { Paper, Modal, Box, Stack, Button, Typography } from "@mui/material";
import backgroundImage from "../assets/BannerImage.png";
import RegisterUser from "../components/RegisterUser";
import LoginForm from "../components/LoginForm";
import { UserContext } from "../context/User";
import "../styles/HomePage.css";

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
    <div className="homepage-container">
      <Paper
        elevation={0}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: {
            xl: "85%",
            lg: "80%",
            md: "75%",
            sm: "65%",
            xs: "55%",
          },
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          minWidth: "100vh",
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
            fontSize: {
              xl: "120px",
              lg: "100px",
              md: "85px",
              sm: "75px",
              xs: "60px",
            },
            fontWeight: "700px",
            color: "orange",
            mt: 8,
          }}
        >
          Gym Hero
        </Typography>
        <Stack
          direction="row"
          sx={{
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
            sx={{
              fontSize: { lg: "20px", sm: "18px", xs: "12px" },
              mt: 1,
              mb: 1,
              width: "35%",
            }}
          >
            LOGIN
          </Button>
          <LoginForm openLogin={openLogin} setOpenLogin={setOpenLogin} />
          <Button
            onClick={handleOpenRegister}
            variant="contained"
            color="secondary"
            sx={{
              fontSize: { lg: "20px", sm: "18px", xs: "12px" },
              mt: 1,
              mb: 1,
              width: "35%",
            }}
          >
            SIGNUP
          </Button>
          <RegisterUser
            openRegister={openRegister}
            setOpenRegister={setOpenRegister}
          />
        </Stack>
      </Paper>
    </div>
  );
};

export default HomePage;
