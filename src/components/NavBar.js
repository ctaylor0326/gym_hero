import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { UserContext } from "../context/User";

const NavBar = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout")
      .then((response) => {
        if (response.ok) {
          setUser(null);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div>
      <Button component={Link} to="/mainmenu">
        Main Menu
      </Button>
      <Button component={Link} to="/exercisedisplay">
        Build Workout
      </Button>
      <Button component={Link} to="/dailyscheduler">
        Daily Scheduler
      </Button>
      <Button component={Link} to="/workoutpage">
        Workout Page
      </Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default NavBar;
