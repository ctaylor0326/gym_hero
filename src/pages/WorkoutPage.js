import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Input,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import { UserContext } from "../context/User";
import NavBar from "../components/NavBar";
import { exerciseOptions } from "../utils/fetchData";

const WorkoutPage = () => {
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { user, selectedWorkouts, setSelectedWorkouts } =
    useContext(UserContext);
  const [currentExerciseData, setCurrentExerciseData] = useState(null);
  const [logExerciseOpen, setLogExerciseOpen] = useState(false);
  const [exerciseStartTime, setExerciseStartTime] = useState(null);
  const [repsCompleted, setRepsCompleted] = useState(0);
  const [weightUsed, setWeightUsed] = useState(0);
  const [exerciseNotes, setExerciseNotes] = useState("");
  const [loggedExerciseSets, setLoggedExerciseSets] = useState([]);

  useEffect(() => {
    console.log("Selected workouts:", selectedWorkouts);
    if (selectedWorkouts && selectedWorkouts.length > 0) {
      fetchCurrentWorkout();
    } else {
      const fetchSelectedWorkouts = async () => {
        try {
          const response = await fetch("/selectedworkouts");
          if (response.ok) {
            const data = await response.json();
            setSelectedWorkouts(data);
          } else {
            console.error(
              "Error fetching selected workouts:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching selected workouts:", error);
        }
      };
      fetchSelectedWorkouts();
      console.log("Fetching selected workouts...");
    }
  }, [setSelectedWorkouts]);

  useEffect(() => {
    if (currentWorkout) {
      fetchExerciseData();
    }
  }, [currentWorkout, currentExerciseIndex]);

  const fetchCurrentWorkout = async () => {
    try {
      const currentDay = getCurrentDayOfWeek();
      const workout = selectedWorkouts?.find((w) => w.weekday === currentDay);

      if (workout) {
        const response = await fetch(`/workouts/${workout.workout_id}`);
        if (response.ok) {
          const data = await response.json();
          const exercises = data.exercises
            .split(",")
            .map((exercise) => exercise.trim());

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
    console.log("Fetching exercise data for ID:", currentExerciseId);
    try {
      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${currentExerciseId}`,
        exerciseOptions
      );
      console.log("Exercise API Response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Exercise data fetched successfully.", data);
        setCurrentExerciseData(data);
        setExerciseStartTime(new Date());
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
    console.log("Previous Exercise Index:", currentExerciseIndex);
  };

  const handleNextExercise = () => {
    const numExercises = currentWorkout.exercises.length;
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex === numExercises - 1 ? 0 : prevIndex + 1
    );
    console.log("Next Exercise Index:", currentExerciseIndex);
  };

  const handleLogExerciseOpen = () => {
    setLogExerciseOpen(true);
  };

  const handleLogExerciseClose = () => {
    setLogExerciseOpen(false);
    setExerciseStartTime(null);
    setRepsCompleted(0);
    setWeightUsed(0);
    setExerciseNotes("");
  };

  const handleLogExercise = async () => {
    const data = {
      exercise_id: currentExerciseData.id,
      exercise_name: currentExerciseData.name,
      duration: getExerciseDuration(),
      reps_completed: repsCompleted,
      weight_used: weightUsed,
      notes: exerciseNotes,
    };

    try {
      const response = await fetch("/logged_exercise_sets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Exercise logged successfully");
        const newExerciseSet = {
          exerciseName: currentExerciseData.name,
          repsCompleted,
          weightUsed,
        };
        setLoggedExerciseSets((prevExerciseSets) => [
          ...prevExerciseSets,
          newExerciseSet,
        ]);
      } else {
        console.error("Error logging exercise:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging exercise:", error);
    }

    handleLogExerciseClose();
  };

  const getExerciseDuration = () => {
    if (exerciseStartTime) {
      const exerciseEndTime = new Date();
      const duration = exerciseEndTime - exerciseStartTime;
      // Return the duration in the desired format (e.g., seconds, minutes, etc.)
      return duration;
    }
    return 0;
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
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={handleLogExerciseOpen}>
            Log Exercise
          </Button>
        </Box>
      </Box>
      <Dialog open={logExerciseOpen} onClose={handleLogExerciseClose}>
        <DialogTitle>Log Exercise</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">
            Duration: {getExerciseDuration()} ms
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="reps-completed">Reps Completed</InputLabel>
            <Input
              id="reps-completed"
              type="number"
              value={repsCompleted}
              onChange={(e) => setRepsCompleted(parseInt(e.target.value))}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="weight-used">Weight Used</InputLabel>
            <Input
              id="weight-used"
              type="number"
              value={weightUsed}
              onChange={(e) => setWeightUsed(parseInt(e.target.value))}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="exercise-notes">Notes</InputLabel>
            <TextareaAutosize
              id="exercise-notes"
              value={exerciseNotes}
              onChange={(e) => setExerciseNotes(e.target.value)}
              minRows={3}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogExerciseClose}>Cancel</Button>
          <Button
            onClick={handleLogExercise}
            variant="contained"
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
      {loggedExerciseSets.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Logged Exercise Sets:</Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {loggedExerciseSets.map((exerciseSet, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Typography variant="body1" style={{ marginRight: "1rem" }}>
                  Exercise: {exerciseSet.exerciseName}
                </Typography>
                <Typography variant="body2" style={{ marginRight: "1rem" }}>
                  Reps Completed: {exerciseSet.repsCompleted}
                </Typography>
                <Typography variant="body2">
                  Weight Used: {exerciseSet.weightUsed}
                </Typography>
              </div>
            ))}
          </div>
        </Box>
      )}
    </div>
  );
};

export default WorkoutPage;
