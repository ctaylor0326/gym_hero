import React, { useEffect, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider, UserContext } from "./context/User";

import HomePage from "./pages/HomePage";
import ExerciseDisplay from "./pages/BuildWorkoutPage";
import WorkoutPage from "./pages/WorkoutPage";
import DailyScheduler from "./pages/DailyScheduler";
import MainMenu from "./pages/MainMenuPage";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            setUser(user);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Navigate to="/mainmenu" /> : <HomePage />}
          />
          <Route exact path="/mainmenu" element={<MainMenu />} />
          <Route exact path="/exercisedisplay" element={<ExerciseDisplay />} />
          <Route exact path="/dailyscheduler" element={<DailyScheduler />} />
          <Route exact path="/workoutpage" element={<WorkoutPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
