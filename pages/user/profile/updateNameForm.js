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

const UpdateNameForm = ({ userInfo, setUserInfo }) => {
  const [alert, setAlert] = useState(false);

  const handleUpdateName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = {
      id: userInfo._id,
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
    };
    const res = await fetch("/api/user/udpate-account/update-name", {
      method: "PUT",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) setAlert(true);
    setUserInfo({
      ...userInfo,
      firstname: requestData.firstname,
      lastname: requestData.lastname,
    });
  };

  return (
    <Box
      component="form"
      name="updateName"
      autoComplete="off"
      onSubmit={handleUpdateName}
    >
      <Stack spacing={2}>
        <FormLabel>
          <Typography variant="h6">Change Name</Typography>
        </FormLabel>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
        >
          <TextField
            fullWidth
            required
            id="firstname"
            label="Firstname"
            type="text"
            name="firstname"
            defaultValue={userInfo.firstname}
          />
          <TextField
            fullWidth
            required
            id="lastname"
            label="Lastname"
            name="lastname"
            type="text"
            defaultValue={userInfo.lastname}
          />
        </Stack>
        {alert && (
          <Alert onClose={() => setAlert(false)}>
            Name successfully changed!!!
          </Alert>
        )}
        <Box>
          <Button variant="contained" type="submit">
            Change Name
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default UpdateNameForm;
