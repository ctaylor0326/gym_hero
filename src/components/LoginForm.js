import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";

export default function LoginForm({ openLogin, setOpenLogin }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleCloseLogin = () => setOpenLogin(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = { email, password };

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data);
            console.log(user);
            localStorage.setItem("user_id", data.id);
            navigate("/exercisedisplay");
          });
        } else {
          response.json().then((data) => {
            setError(data.message);
            alert("Invalid email or password!");
            setEmail("");
            setPassword("");
          });
        }
      })
      .catch((error) => console.log(error));
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="login-password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <DialogActions>
        <Button onClick={handleCloseLogin}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}
