import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser, openLogin, setOpenLogin }) {
    const handleCloseLogin = () => setOpenLogin(false);
    const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("register-password").value;

    const formData = { email, password };

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => {
          if (r.ok) {
              r.json().then((user) => {
                  setUser(user)
                  localStorage.setItem("user_id", user.id);
                  navigate("/exercisedisplay")
              });
              
          }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog open={openLogin} onClose={handleCloseLogin}>
      <DialogTitle>Login</DialogTitle>
      <TextField
        autoFocus
        margin="dense"
        id="login-email"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      />
      <TextField
        id="register-password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
      />
      <DialogActions>
        <Button onClick={handleCloseLogin}>Cancel</Button>
        <Button onClick={handleSubmit}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}
