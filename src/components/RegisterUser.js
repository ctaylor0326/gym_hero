import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";


export default function RegisterUser({ openRegister, setOpenRegister }) {
    const handleCloseRegister = () => setOpenRegister(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const first_name = document.getElementById("first_name").value
        const last_name = document.getElementById("last_name").value
        const email = document.getElementById("register-email").value
        const password = document.getElementById("register-password").value

        const formData = { first_name, last_name, email, password }
        
        fetch("http://127.0.0.1:5555/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((r) => {
            console.log(r);
          })
          .catch((e) => console.log(e));
    }
        
    return (
      <Dialog open={openRegister} onClose={handleCloseRegister}>
        <DialogTitle>Register New User</DialogTitle>
        <TextField
          id="first_name"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          id="last_name"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="register-email"
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
          <Button onClick={handleCloseRegister}>Cancel</Button>
          <Button onClick={handleSubmit}>Register</Button>
        </DialogActions>
      </Dialog>
    );
}