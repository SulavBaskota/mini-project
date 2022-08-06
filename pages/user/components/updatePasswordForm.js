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
import Loader from "../../../components/Loader";

const UpdatePasswordForm = ({ userInfo }) => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState({
    oldPass: false,
    newPass: false,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      setError({ ...error, newPass: true });
      setLoading(false);
      return;
    }
    setError({ ...error, newPass: false });
    const requestData = {
      id: userInfo._id,
      oldPassword: formData.get("oldPassword"),
      newPassword: formData.get("newPassword"),
    };
    if (requestData.oldPassword === "" || requestData.newPassword === "") {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/user/udpate-account/update-password", {
        method: "PUT",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setLoading(false);
      if (!res.success) {
        throw res.error;
      }
      setError({ ...error, oldPass: false });
      if (res.success) setAlert(true);
      event.target.reset();
    } catch (error) {
      if (error === "incorrect password") setError({ ...error, oldPass: true });
    }
  };

  return (
    <>
      {loading && <Loader open={loading} />}
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
    </>
  );
};

export default UpdatePasswordForm;
