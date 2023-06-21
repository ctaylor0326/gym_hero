import { Box, Button, Typography, Icon, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WorkoutBuilder({ workoutList, setWorkoutList }) {
  const [workoutName, setWorkoutName] = useState("");

  const handleDeleteExercise = (i) => {
    const newList = [...workoutList];
    newList.splice(i, 1);
    setWorkoutList(newList);
  };

  const handleCreateWorkout = (e) => {
    e.preventDefault();

    if (!workoutName) {
      alert("Please enter a name for your workout!");
      return;
    }
    if (workoutList.length === 0) {
      alert("Please add exercises to your workout!");
      return;
    }

    const exerciseListById = workoutList
      .map((exercise) => exercise.id)
      .join(",");
    const workoutData = {
      workout_name: workoutName,
      exercises: exerciseListById,
    };

    fetch("http://127.0.0.1:5555/workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData),
    }).then((r) => {
      if (r.ok) {
        alert("Workout Saved");
        setWorkoutName("");
        setWorkoutList([]);
      }
    });
  };

  const workoutListMenu = workoutList.map((exercise, i) => {
    return (
      <Stack key={exercise.id}>
        <Typography>{exercise.name}</Typography>
        <Button onClick={(e) => handleDeleteExercise(i)}>
          <DeleteIcon />
        </Button>
      </Stack>
    );
  });

  return (
    <Box>
      {workoutListMenu}
      <TextField
        id="workout-name"
        label="Workout Name"
        type="text"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      >
        Workout Name
      </TextField>
      <Button onClick={handleCreateWorkout}>Create Workout</Button>
    </Box>
  );
}
