import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { UserContext } from "../context/User";
import NavBar from "../components/NavBar";
import backgroundImage from "../assets/BannerImage.png";

const DailyScheduler = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const { user, selectedWorkouts, setSelectedWorkouts } =
    useContext(UserContext);
  console.log(user);

  useEffect(() => {
    fetchWorkouts();
    fetchSelectedWorkouts();
  }, []);

  const fetchSelectedWorkouts = async () => {
    try {
      const response = await fetch("/selectedworkouts");
      if (response.ok) {
        const data = await response.json();
        setSelectedWorkouts(data);
        setIsLoading(false);
      } else {
        console.error("Error fetching selected workouts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching selected workouts:", error);
    }
  };
  console.log(selectedWorkouts);

  const handleWorkoutSelection = (day, workoutId) => {
    const existingWorkoutIndex = selectedWorkouts.findIndex(
      (workout) => workout.weekday === day
    );

    if (existingWorkoutIndex > -1) {
      setSelectedWorkouts((prevSelectedWorkouts) => {
        const updatedWorkouts = [...prevSelectedWorkouts];
        updatedWorkouts[existingWorkoutIndex] = {
          ...updatedWorkouts[existingWorkoutIndex],
          workout_id: workoutId,
        };
        return updatedWorkouts;
      });
    } else {
      setSelectedWorkouts((prevSelectedWorkouts) => [
        ...prevSelectedWorkouts,
        {
          weekday: day,
          workout_id: workoutId,
        },
      ]);
    }
  };

  const handleAssignWorkout = async () => {
    try {
      for (const workout of selectedWorkouts) {
        const { weekday, workout_id } = workout;

        // Attempt PATCH request to update existing record
        const patchResponse = await fetch("/dailyschedules", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weekday, workout_id }),
        });

        if (patchResponse.ok) {
          console.log(`Workout for ${weekday} updated successfully.`);
        } else if (patchResponse.status === 404) {
          // If no existing record found, attempt POST request
          const postResponse = await fetch("/dailyschedules", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ weekday, workout_id }),
          });

          if (postResponse.ok) {
            console.log(`Workout for ${weekday} assigned successfully.`);
          } else {
            console.error(
              `Error assigning workout for ${weekday}: ${postResponse.statusText}`
            );
          }
        } else {
          console.error(
            `Error updating workout for ${weekday}: ${patchResponse.statusText}`
          );
        }
      }
    } catch (error) {
      console.error("Error assigning workouts:", error);
    }
  };

  const handleClearWorkouts = async () => {
    setIsDeleting(true);

    try {
      const weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      for (const weekday of weekdays) {
        const response = await fetch("/dailyschedules", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weekday }),
        });

        if (!response.ok) {
          console.error(
            `Error deleting workouts for ${weekday}:`,
            response.statusText
          );
        }
      }

      setSelectedWorkouts([]);
    } catch (error) {
      console.error("Error deleting workouts:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchWorkouts = async (fetchUserSpecific = false) => {
    try {
      let url = "/workouts";
      if (fetchUserSpecific) {
        url += `?creator=${user.id}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      } else {
        console.error("Error fetching workouts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handlePopupOpen = (day) => {
    setSelectedDay(day);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <Grid container spacing={0} sx={{ marginTop: "32px" }}>
        <Grid item xs={6} md={6}>
          <div
            style={{
              minHeight: "70vh",
              maxHeight: "80vh",
              borderRight: "5px solid red",
              paddingLeft: "32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box p={2}>
              <Typography variant="h5" gutterBottom textAlign={"right"}>
                Daily Scheduler
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => {
                  const selectedWorkout = selectedWorkouts.find(
                    (workout) => workout.weekday === day
                  );
                  const workoutName = selectedWorkout
                    ? workouts.find(
                        (workout) => workout.id === selectedWorkout.workout_id
                      )?.workout_name || ""
                    : selectedWorkout?.workout_name || "";

                  return (
                    <Box key={day} display="flex" alignItems="center" mb={2}>
                      <Typography variant="subtitle1" mr={2}>
                        {day}
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={workoutName.toUpperCase()}
                        disabled
                      />
                      <Button
                        variant="outlined"
                        onClick={() => handlePopupOpen(day)}
                        ml={2}
                      >
                        Change
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box ml="auto" p={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAssignWorkout}
              >
                Assign Workouts
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearWorkouts}
                disabled={isDeleting}
              >
                Clear Workouts
              </Button>
            </Box>
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <div
            style={{
              minHeight: "70vh",
              maxHeight: "80vh",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "contain",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Content for the right column, if needed */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DailyScheduler;
