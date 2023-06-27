import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { UserContext } from "../context/User";
import NavBar from "../components/NavBar";
import { exerciseOptions } from "../utils/fetchData";

const WorkoutPage = () => {
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { user, selectedWorkouts, setSelectedWorkouts } =
    useContext(UserContext);
  const [currentExerciseData, setCurrentExerciseData] = useState(null);

  useEffect(() => {
    fetchCurrentWorkout();
  }, []);

  useEffect(() => {
    if (currentWorkout) {
      fetchExerciseData();
    }
  }, [currentWorkout]);

  const fetchCurrentWorkout = async () => {
    try {
      const currentDay = getCurrentDayOfWeek();
      const workout = selectedWorkouts.find((w) => w.weekday === currentDay);

      if (workout) {
        const response = await fetch(`/workouts/${workout.workout_id}`);
        if (response.ok) {
          const data = await response.json();
          const exercises = data.exercises
            .split(",")
            .map((exercise) => parseInt(exercise.trim(), 10));
          setCurrentWorkout({ ...data, exercises });
        } else {
          console.error("Error fetching workout:", response.statusText);
        }
      } else {
        console.log(`No workout assigned for ${currentDay}`);
      }
    } catch (error) {
      console.error("Error fetching current workout:", error);
    }
  };

  const fetchExerciseData = async () => {
    const currentExerciseId = currentWorkout.exercises[currentExerciseIndex];
    console.log(currentExerciseId);
    try {
      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${currentExerciseId}`,
        exerciseOptions
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentExerciseData(data);
      } else {
        console.error("Error fetching exercise data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching exercise data:", error);
    }
  };

  const getCurrentDayOfWeek = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    return daysOfWeek[currentDate.getDay()];
  };

  const handlePreviousExercise = () => {
    const numExercises = currentWorkout.exercises.length;
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex === 0 ? numExercises - 1 : prevIndex - 1
    );
  };

  const handleNextExercise = () => {
    const numExercises = currentWorkout.exercises.length;
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex === numExercises - 1 ? 0 : prevIndex + 1
    );
  };

  if (!currentWorkout || !currentExerciseData) {
    return null; // Render loading spinner or placeholder while fetching the data
  }

  const { name, bodyPart, equipment, gifUrl } = currentExerciseData;

  return (
    <div>
      <NavBar />
      <Box>
        <TextField
          label="Workout"
          value={`${currentWorkout.weekday}: ${currentWorkout.workout_name}`}
          variant="outlined"
          margin="normal"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Button variant="contained" onClick={handlePreviousExercise}>
            Previous Exercise
          </Button>
          <Button variant="contained" onClick={handleNextExercise} ml={2}>
            Next Exercise
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body1">Body Part: {bodyPart}</Typography>
            <Typography variant="body1">Equipment: {equipment}</Typography>
          </Box>
          <Box ml={2}>
            <img src={gifUrl} alt={name} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default WorkoutPage;
