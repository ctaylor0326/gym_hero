import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Exercises from "../components/Exercises";
import SearchExercises from "../components/SearchExercises";
import ExerciseFilter from "../components/ExerciseFilter";
import { fetchData, exerciseOptions } from "../utils/fetchData";

const ExerciseDisplay = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      console.log(bodyPartsData);
      setBodyParts(["all", ...bodyPartsData]);
    };
    const fetchEquipmentData = async () => {
      const equipmentData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/equipmentList",
        exerciseOptions
      );
      console.log(equipmentData);
      setEquipmentList(["all", ...equipmentData]);
    };

    fetchExercisesData();
    fetchEquipmentData();
  }, []);

  return (
    <Box>
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
      />
    </Box>
  );
};

export default ExerciseDisplay;
