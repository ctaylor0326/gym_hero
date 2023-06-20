import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function Exercises({ exercises }) {
  const exerciseCards = exercises.map((exercise) => {
    return (
      <Grid item>
        <Card key={exercise} value={exercise} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={exercise.gifUrl}
              alt={exercise.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {exercise.name}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography> */}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Add To Workout
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return <Grid container>{exerciseCards}</Grid>;
}
