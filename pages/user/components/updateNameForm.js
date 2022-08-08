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

const UpdateNameForm = ({ userInfo, setUserInfo }) => {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateName = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const requestData = {
      id: userInfo._id,
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
    };
    if (
      userInfo.firstname === requestData.firstname &&
      userInfo.lastname === requestData.lastname
    ) {
      setLoading(false);
      return;
    }
    const res = await fetch(
      "/api/user/udpate-account/update-name",
      getRequestOptions(requestData, "PUT")
    ).then((res) => res.json());
    setLoading(false);
    if (res.success) setAlert(true);
    setUserInfo({
      ...userInfo,
      firstname: requestData.firstname,
      lastname: requestData.lastname,
    });
  };

  return (
    <>
      {loading && <Loader open={loading} />}
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
    </>
  );
};

export default UpdateNameForm;
