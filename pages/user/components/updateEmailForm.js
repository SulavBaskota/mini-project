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

const UpdateEmailForm = ({ userInfo, setUserInfo }) => {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const requestData = {
      id: userInfo._id,
      email: formData.get("email"),
    };
    if (userInfo.email === requestData.email) {
      setLoading(false);
      return;
    }
    const res = await fetch("/api/user/udpate-account/update-email", {
      method: "PUT",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setLoading(false);
    if (res.success) {
      setUserInfo({ ...userInfo, email: requestData.email });
      setAlert(true);
    }
  };

  return (
    <>
      {loading && <Loader open={loading} />}
      <Box
        component="form"
        name="updateEmail"
        autoComplete="off"
        onSubmit={handleUpdateEmail}
      >
        <Stack spacing={2}>
          <FormLabel>
            <Typography variant="h6">Change Email</Typography>
          </FormLabel>
          <TextField
            id="email"
            required
            label="Email"
            name="email"
            type="email"
            defaultValue={userInfo.email}
          />
          {alert && (
            <Alert onClose={() => setAlert(false)}>
              Email successfully changed!!!
            </Alert>
          )}
          <Box>
            <Button variant="contained" type="submit">
              Change Email Address
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default UpdateEmailForm;
