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
import { getRequestOptions } from "../../../src/Utils";

const UpdatePasswordForm = ({ userInfo }) => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState({
    oldPass: false,
    newPass: false,
    confirmPass: false,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError({ ...error, newPass: false });
    const formData = new FormData(event.currentTarget);
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      setError({ ...error, confirmPass: true });
      setLoading(false);
      return;
    }
    setError({ ...error, confirmPass: false });
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
      const res = await fetch(
        "/api/user/udpate-account/update-password",
        getRequestOptions(requestData, "PUT")
      ).then((res) => res.json());

      setLoading(false);
      if (!res.success) {
        throw res.error;
      }
      setError({ ...error, oldPass: false });
      setError({ ...error, newPass: false });
      if (res.success) setAlert(true);
      event.target.reset();
    } catch (error) {
      if (error === "incorrect password") setError({ ...error, oldPass: true });
      if (error === "invalid password") setError({ ...error, newPass: true });
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
            helperText={
              error.newPass
                ? "Password must be 8 to 20 character which contains at least one numeric digit, one uppercase and one lowercase letter"
                : ""
            }
          />
          <TextField
            required
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            error={error.confirmPass}
            helperText={error.confirmPass ? "Passwords donot match" : ""}
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
