import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function Exercises({ workoutList, setWorkoutList, exercises }) {
  const handleAddToWorkout = (exercise) => {
    setWorkoutList([...workoutList, exercise]);
  };

  const exerciseCards = exercises.map((exercise) => {
    return (
      <Grid item xs={4} md={3} xl={2}>
        <Card
          key={exercise}
          value={exercise}
          sx={{ height: 300, maxWidth: 345 }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="140"
              image={exercise.gifUrl}
              alt={exercise.name}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                {exercise.name}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography> */}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={(e) => handleAddToWorkout(exercise)}
              size="small"
              color="primary"
            >
              Add To Workout
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container px={4} rowSpacing={3} spacing={2}>
      {exerciseCards}
    </Grid>
  );
}
