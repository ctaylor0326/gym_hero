import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchData, exerciseOptions } from "../utils/fetchData";

export default function ExerciseFilter({
  setExercises,
  bodyParts,
  bodyPart,
  setBodyPart,
  equipmentList,
}) {
  const [equipment, setEquipment] = useState("all");
  const handleBodyPartSelect = (event) => {
    setBodyPart(event.target.value);
  };

  const handleEquipmentSelect = (event) => {
    setEquipment(event.target.value);
  };

  const bodyPartsMenu = bodyParts.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  const equipmentMenu = equipmentList.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  useEffect(() => {
    const fetchFilteredExercises = async () => {
      let exerciseURL = "https://exercisedb.p.rapidapi.com/exercises";
      if (bodyPart != "all") exerciseURL += `/bodyPart/${bodyPart}`;
      const filteredExercises = await fetchData(exerciseURL, exerciseOptions);
      if (equipment == "all") setExercises(filteredExercises);
      else {
        const filteredByEquipment = filteredExercises.filter((item) => {
          return item.equipment == equipment;
        });
        setExercises(filteredByEquipment);
      }
    };
    fetchFilteredExercises();
  }, [bodyPart, equipment]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="body-part-filter">Muscle Group</InputLabel>
        <Select
          labelId="body-part-filter"
          id="body-part-filter"
          value={bodyPart}
          label="Muscle Group"
          onChange={handleBodyPartSelect}
        >
          {bodyPartsMenu}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="equipment-filter">Equipment Used</InputLabel>
        <Select
          labelId="equipment-filter"
          id="equipment-filter"
          value={equipment}
          label="Equipment Used"
          onChange={handleEquipmentSelect}
        >
          {equipmentMenu}
        </Select>
      </FormControl>
    </Box>
  );
}
