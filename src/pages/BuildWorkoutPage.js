import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Exercises from "../components/Exercises";
import SearchExercises from "../components/SearchExercises";
import ExerciseFilter from "../components/ExerciseFilter";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import WorkoutBuilder from "../components/WorkoutBuilder";
import NavBar from "../components/NavBar";

const ExerciseDisplay = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    const fetchEquipmentData = async () => {
      const equipmentData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/equipmentList",
        exerciseOptions
      );
      setEquipmentList(["all", ...equipmentData]);
    };

    fetchExercisesData();
    fetchEquipmentData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1, mr: 2, ml: 2, overflowY: "auto" }}>
          <Box>
            <SearchExercises
              setExercises={setExercises}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
              bodyParts={bodyParts}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <ExerciseFilter
              setExercises={setExercises}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
              bodyParts={bodyParts}
              equipmentList={equipmentList}
            />
          </Box>
          <Box sx={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto" }}>
            <Exercises
              exercises={exercises}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
              setWorkoutList={setWorkoutList}
              workoutList={workoutList}
            />
          </Box>
        </Box>
        <Card sx={{ minWidth: 200, p: 2, position: "sticky", top: "1rem" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Workout Builder
            </Typography>
            <WorkoutBuilder
              workoutList={workoutList}
              setWorkoutList={setWorkoutList}
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ExerciseDisplay;
