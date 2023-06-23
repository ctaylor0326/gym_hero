import React from "react";
import { Paper, Button } from "@mui/material";
import backgroundImage from "../assets/BannerImage.png";
import { useNavigate } from "react-router-dom";

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
    <Paper
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: { lg: "35%", sm: "50%", xs: "50%" },
        backgroundPosition: "left",
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
      <div>
        <Button variant="contained" onClick={handleStartWorkout}>
          Start Today's Workout
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={handleViewSchedule}>
          View/Edit Workout Schedule
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={handleBuildWorkout}>
          Build New Workout
        </Button>
      </div>
    </Paper>
  );
};

export default MainMenu;
