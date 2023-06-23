import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
  // const [selectedExercise, setSelectedExercise] = useState({});
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
    <div>
      <NavBar />
      <Box>
        <WorkoutBuilder
          workoutList={workoutList}
          setWorkoutList={setWorkoutList}
          // selectedExercise={selectedExercise}
          // setSelectedExercise={setSelectedExercise}
        />
        <SearchExercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          bodyParts={bodyParts}
        />
        <ExerciseFilter
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          bodyParts={bodyParts}
          equipmentList={equipmentList}
        />
        <Exercises
          exercises={exercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          setWorkoutList={setWorkoutList}
          workoutList={workoutList}
        />
      </Box>
    </div>
  );
};

export default ExerciseDisplay;
