import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "./context/User";
import { BrowserRouter as Router } from "react-router-dom";
import { themeOptions } from "./styles/themeOptions";
import App from "./App";

// Create the MUI theme using themeOptions
const theme = createTheme(themeOptions);

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap your app with the ThemeProvider */}
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
