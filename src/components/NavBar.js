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
    <div
      style={{
        position: "sticky",
        display: "flex",
        justifyContent: "center",
        width: "auto",
        margin: "0 auto",
        marginTop: "1rem",
        top: 0,
        backgroundColor: "#f9f9f9",
        zIndex: 100,
        flexWrap: "wrap",
      }}
    >
      <Button
        component={Link}
        to="/"
        sx={{
          fontSize: { lg: "1.4rem", md: "1.2rem", xs: ".9rem" },
          padding: "0.5rem 1rem",
          whiteSpace: "nowrap", // Add this line
        }}
      >
        Main Menu
      </Button>
      <Button
        component={Link}
        to="/exercisedisplay"
        sx={{
          fontSize: { lg: "1.4rem", md: "1.2rem", xs: ".9rem" },
          padding: "0.5rem 1rem",
          whiteSpace: "nowrap", // Add this line
        }}
      >
        Build Workout
      </Button>
      <Button
        component={Link}
        to="/dailyscheduler"
        sx={{
          fontSize: { lg: "1.4rem", md: "1.2rem", xs: ".9rem" },
          padding: "0.5rem 1rem",
          whiteSpace: "nowrap", // Add this line
        }}
      >
        Daily Scheduler
      </Button>
      <Button
        component={Link}
        to="/workoutpage"
        sx={{
          fontSize: { lg: "1.4rem", md: "1.2rem", xs: ".9rem" },
          padding: "0.5rem 1rem",
          whiteSpace: "nowrap", // Add this line
        }}
      >
        Workout Page
      </Button>
      <Button
        onClick={handleLogout}
        sx={{
          fontSize: { lg: "1.4rem", md: "1.2rem", xs: ".9rem" },
          padding: "0.5rem 1rem",
          whiteSpace: "nowrap", // Add this line
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default NavBar;
