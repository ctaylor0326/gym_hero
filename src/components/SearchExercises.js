import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );
      const searchedExercises = exercisesData.filter(
        ((exercise) => exercise.name.toLowerCase().includes(search)) ||
          ((exercise) => exercise.target.toLowerCase().includes(search)) ||
          ((exercise) => exercise.equipment.toLowerCase().includes(search)) ||
          ((exercise) => exercise.bodypart.toLowerCase().includes(search))
      );
      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="20px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", md: "38px", sm: "30px", xs: "20px" } }}
        mb="20px"
        textAlign="center"
      >
        Build Your Own Workout
      </Typography>
      <Box position="relative" mb="20px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "800px", md: "600px", sm: "500px", xs: "150px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{
            bgcolor: "secondary",
            color: "#FFF",
            textTransform: "none",
            width: { lg: "175px", sm: "100px", xs: "50px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Stack>
  );
};

export default SearchExercises;
