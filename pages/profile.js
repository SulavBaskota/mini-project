import {
  Container,
  Typography,
  Box,
  Divider,
  Stack,
  TextField,
  Button,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ImageUpload from "../components/ImageUpload";

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack spacing={2} mt={2}>
        <Typography variant="h5">User Profile</Typography>
        <Divider />
      </Stack>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ width: 900, maxWidth: "100%" }}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center">
              <AccountCircleIcon sx={{ width: 100, height: 100 }} />
              <Typography variant="h4">Username</Typography>
            </Stack>
            <Divider />
            <FormLabel>
              <Typography variant="h6">Change Password</Typography>
            </FormLabel>
            <TextField id="oldPassword" label="Old Password" type="password" />
            <TextField id="newPassword" label="New Password" type="password" />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
            />
            <FormLabel>
              <Typography variant="h6">Upload Profile Picture</Typography>
            </FormLabel>
            <ImageUpload
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
            <Divider />
            <Stack
              direction={{ xs: "row-reverse", md: "row" }}
              justifyContent="flex-end"
              spacing={2}
            >
              <Button href="/" color="error" variant="outlined">
                Cancel
              </Button>
              <Button variant="contained">Save Changes</Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
