import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { UserContext } from "../context/User";
import NavBar from "../components/NavBar";

const DailyScheduler = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const { user } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    fetchWorkouts();
    fetchSelectedWorkouts();
  }, []);

  const fetchSelectedWorkouts = async () => {
    try {
      const response = await fetch("/selectedworkouts");
      if (response.ok) {
        const data = await response.json();
        setSelectedWorkouts(data);
        console.log(selectedWorkouts);
      } else {
        console.error("Error fetching selected workouts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching selected workouts:", error);
    }
  };

  const handleWorkoutSelection = (day, workoutId) => {
    const existingWorkoutIndex = selectedWorkouts.findIndex(
      (workout) => workout.weekday === day
    );

    if (existingWorkoutIndex > -1) {
      setSelectedWorkouts((prevSelectedWorkouts) => {
        const updatedWorkouts = [...prevSelectedWorkouts];
        updatedWorkouts[existingWorkoutIndex] = {
          ...updatedWorkouts[existingWorkoutIndex],
          workout_id: workoutId,
        };
        return updatedWorkouts;
      });
    } else {
      setSelectedWorkouts((prevSelectedWorkouts) => [
        ...prevSelectedWorkouts,
        {
          weekday: day,
          workout_id: workoutId,
        },
      ]);
    }
  };

  const handleAssignWorkout = async () => {
    try {
      const response = await fetch("/dailyschedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedWorkouts),
      });
      if (response.ok) {
        console.log("Workouts assigned successfully!");
      } else {
        console.error("Error assigning workouts:", response.statusText);
      }
    } catch (error) {
      console.error("Error assigning workouts:", error);
    }
  };

  const fetchWorkouts = async (fetchUserSpecific = false) => {
    try {
      let url = "/workouts";
      if (fetchUserSpecific) {
        url += `?creator=${user.id}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      } else {
        console.error("Error fetching workouts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handlePopupOpen = (day) => {
    setSelectedDay(day);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <NavBar />
      <Box>
        <Typography variant="h5" gutterBottom>
          Daily Scheduler
        </Typography>
        <Box display="flex" flexDirection="column">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <Box key={day} display="flex" alignItems="center" mb={2}>
              <Typography variant="subtitle1" mr={2}>
                {day}
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                value={
                  selectedWorkouts.find((workout) => workout.weekday === day)
                    ?.workout_id
                    ? workouts
                        .find(
                          (workout) =>
                            workout.id ===
                            selectedWorkouts.find(
                              (workout) => workout.weekday === day
                            ).workout_id
                        )
                        .workout_name.toUpperCase()
                    : ""
                }
                disabled
              />

              <Button
                variant="outlined"
                onClick={() => handlePopupOpen(day)}
                ml={2}
              >
                Change
              </Button>
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAssignWorkout}
        >
          Assign Workouts
        </Button>

        <Dialog open={isPopupOpen} onClose={handlePopupClose}>
          <DialogTitle>Workout Selector</DialogTitle>
          <DialogContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <Button variant="contained" onClick={() => fetchWorkouts(false)}>
                All Workouts
              </Button>
              <Button variant="contained" onClick={() => fetchWorkouts(true)}>
                My Workouts
              </Button>
            </Box>
            {/* Display the fetched workouts here */}
            {workouts.map((workout) => (
              <Button
                key={workout.id}
                variant="outlined"
                onClick={() => handleWorkoutSelection(selectedDay, workout.id)}
              >
                {workout.workout_name}
              </Button>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default DailyScheduler;
