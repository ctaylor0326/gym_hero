import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExerciseDisplay from "./pages/BuildWorkoutPage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (user) {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage setUser={setUser} />} />
        <Route exact path="/exercisedisplay" element={<ExerciseDisplay />} />
      </Routes>
    </Router>
  );
  // } else {
  //   return (
  //     <Router>
  //       <Routes>
  //         <Route exact path="/" component={<HomePage />} />
  //       </Routes>
  //     </Router>
  //   );
  // }
};

export default App;
