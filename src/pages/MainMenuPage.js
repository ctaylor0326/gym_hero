import React, { useContext } from "react";
import { Grid, Typography, Button } from "@mui/material";
import backgroundImage from "../assets/BannerImage.png";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/User";

const MainMenu = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleStartWorkout = () => {
    navigate("/workoutpage");
  };

  const handleViewSchedule = () => {
    navigate("/dailyscheduler");
  };

  const handleBuildWorkout = () => {
    navigate("/exercisedisplay");
  };

  return (
    <div>
      <NavBar />
      <Grid container spacing={0} sx={{ marginTop: "32px" }}>
        <Grid item xs={6} lg={6}>
          <div
            style={{
              minHeight: "70vh",
              maxHeight: "80vh",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "contain",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Content for the left column, if needed */}
          </div>
        </Grid>
        <Grid item xs={6} lg={6}>
          <div
            style={{
              minHeight: "70vh",
              maxHeight: "80vh",
              borderLeft: "5px solid red",
              paddingLeft: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "flex-start", // Align content to the left
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontSize: { lg: "50px", md: "40px", sm: "30px", xs: "20px" },
              }}
            >
              Welcome Back, {user.first_name}!
            </Typography>
            <div style={{ marginTop: "16px", width: "100%" }}>
              <div style={{ width: "100%" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={handleStartWorkout}
                  sx={{
                    width: { lg: "40%", sm: "65%", xs: "100%" },
                    height: "100%",
                    textAlign: "left",
                    fontSize: {
                      lg: "20px",
                      md: "15px",
                      sm: "13px",
                      xs: "10px",
                    },
                  }}
                >
                  Start Today's Workout
                </Button>
              </div>
            </div>
            <div style={{ marginTop: "16px", width: "100%" }}>
              <div style={{ width: "100%" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={handleViewSchedule}
                  sx={{
                    width: { lg: "50%", sm: "75%", xs: "100%" },
                    height: "100%",
                    textAlign: "left",
                    fontSize: {
                      lg: "20px",
                      md: "15px",
                      sm: "13px",
                      xs: "10px",
                    },
                  }}
                >
                  View/Edit Workout Schedule
                </Button>
              </div>
            </div>
            <div style={{ marginTop: "16px", width: "100%" }}>
              <div style={{ width: "100%" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={handleBuildWorkout}
                  sx={{
                    width: { lg: "40%", sm: "65%", xs: "100%" },
                    height: "100%",
                    textAlign: "left",
                    fontSize: {
                      lg: "20px",
                      md: "15px",
                      sm: "13px",
                      xs: "10px",
                    },
                  }}
                >
                  Build New Workout
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainMenu;
