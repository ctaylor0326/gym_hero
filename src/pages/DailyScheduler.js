import React, { useEffect, useState, useContext } from "react";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { UserContext } from "../context/User";

const DailyScheduler = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const { user } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    // Fetch available workouts from the backend
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/workouts");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setWorkouts(data);
        } else {
          console.error("Error fetching workouts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleWorkoutSelection = (day, workoutId) => {
    setSelectedWorkouts((prevSelectedWorkouts) => [
      ...prevSelectedWorkouts,
      {
        workout_id: workoutId,
        weekday: day,
      },
    ]);
  };
  console.log(selectedWorkouts);
  const handleAssignWorkout = async () => {
    try {
      // Send a request to create instances of DailySchedule on the backend
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

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Daily Scheduler
      </Typography>
      <Box display="flex" alignItems="center" mt={2}>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
          <Box key={day} mr={2}>
            <Typography variant="subtitle1">{day}</Typography>
            <Select
              value={selectedWorkouts[day] || ""}
              onChange={(e) => handleWorkoutSelection(day, e.target.value)}
            >
              <MenuItem value="">No workout</MenuItem>
              {workouts.map((workout) => (
                <MenuItem key={workout.id} value={workout.id}>
                  {workout.workout_name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleAssignWorkout}>
        Assign Workouts
      </Button>
    </Box>
  );
};

export default DailyScheduler;
