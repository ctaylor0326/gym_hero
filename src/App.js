import React, { useEffect, useContext, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  redirect,
  useLocation,
  Outlet,
} from "react-router-dom";
import { UserProvider, UserContext } from "./context/User";

import HomePage from "./pages/HomePage";
import ExerciseDisplay from "./pages/BuildWorkoutPage";
import WorkoutPage from "./pages/WorkoutPage";
import DailyScheduler from "./pages/DailyScheduler";
import MainMenu from "./pages/MainMenuPage";

const RequireAuth = () => {
  const { user, setUser } = useContext(UserContext);
  let location = useLocation();
  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            setUser(user);
          });
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
      });
  }, []);
  console.log(user);
  if (user === undefined) {
    return <p>Loading...</p>;
  } else if (user === null) {
    redirect("/login");
  }
  return (
    <Routes>
      <Route exact path="/login" element={<HomePage />} />
      <Route element={<RequireAuth />}>
        <Route exact path="/" element={<MainMenu />} />
        <Route exact path="/exercisedisplay" element={<ExerciseDisplay />} />
        <Route exact path="/dailyscheduler" element={<DailyScheduler />} />
        <Route exact path="/workoutpage" element={<WorkoutPage />} />
      </Route>
    </Routes>
  );
};

export default App;
