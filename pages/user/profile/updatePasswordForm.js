import {
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  FormLabel,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const UpdatePasswordForm = ({ userInfo }) => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState({
    oldPass: false,
    newPass: false,
  });

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      setError({ ...error, newPass: true });
      return;
    }
    setError({ ...error, newPass: false });
    const requestData = {
      id: userInfo._id,
      oldPassword: formData.get("oldPassword"),
      newPassword: formData.get("newPassword"),
    };
    try {
      const res = await fetch("/api/user/udpate-account/update-password", {
        method: "PUT",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data.error;
      }
      setError({ ...error, oldPass: false });
      if (res.ok) setAlert(true);
      event.target.reset();
    } catch (error) {
      if (error === "incorrect password") setError({ ...error, oldPass: true });
    }
  };
  
  return (
    <Box
      component="form"
      name="updatePassword"
      autoComplete="off"
      onSubmit={handleUpdatePassword}
    >
      <Stack spacing={2}>
        <FormLabel>
          <Typography variant="h6">Change Password</Typography>
        </FormLabel>
        <TextField
          required
          id="oldPassword"
          label="Old Password"
          name="oldPassword"
          type="password"
          error={error.oldPass}
          helperText={error.oldPass ? "Incorrect Password" : ""}
        />
        <TextField
          required
          id="newPassword"
          label="New Password"
          name="newPassword"
          type="password"
          error={error.newPass}
          helperText={error.newPass ? "Passwords donot match" : ""}
        />
        <TextField
          required
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          error={error.newPass}
          helperText={error.newPass ? "Passwords donot match" : ""}
        />
        {alert && (
          <Alert onClose={() => setAlert(false)}>
            Password successfully changed!!!
          </Alert>
        )}
        <Box>
          <Button variant="contained" type="submit">
            Change Password
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default UpdatePasswordForm;
