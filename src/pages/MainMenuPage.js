import React from "react";
import { Box, Paper, Button } from "@mui/material";
import backgroundImage from "../assets/BannerImage.png";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainMenu = () => {
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
      <Paper
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: { lg: "35%", sm: "50%", xs: "50%" },
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Adjusted to center the buttons vertically
          alignItems: "center",
          padding: "40px",
          textAlign: "center",
          paddingBottom: "80px",
        }}
      >
        <div>
          <Button variant="contained" onClick={handleStartWorkout}>
            Start Today's Workout
          </Button>
        </div>
        <div style={{ marginTop: "16px" }}>
          {" "}
          {/* Added margin-top for spacing */}
          <Button variant="contained" onClick={handleViewSchedule}>
            View/Edit Workout Schedule
          </Button>
        </div>
        <div style={{ marginTop: "16px" }}>
          {" "}
          {/* Added margin-top for spacing */}
          <Button variant="contained" onClick={handleBuildWorkout}>
            Build New Workout
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default MainMenu;
