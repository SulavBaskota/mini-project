import { Typography, Box, Stack, Button, FormLabel } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import ImageUpload from "../../../../components/ImageUpload";

const UpdateProfileImageForm = ({ userInfo, setUserInfo }) => {
  const [alert, setAlert] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const handleUpdateProfilePicture = async (event) => {
    event.preventDefault();
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "profile-pics");

    const cloudinaryResponse = await fetch(
      "https://api.cloudinary.com/v1_1/readhub/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    const requestData = {
      id: userInfo._id,
      imgUrl: cloudinaryResponse.secure_url,
    };

    const res = await fetch("/api/user/udpate-account/update-profile-image", {
      method: "PUT",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setSelectedImage(null);
      setUserInfo({ ...userInfo, imgUrl: requestData.imgUrl });
      setAlert(true);
    }
    reloadSession();
  };

  return (
    <Box
      component="form"
      name="updateProfilePicture"
      autoComplete="off"
      onSubmit={handleUpdateProfilePicture}
    >
      <Stack spacing={2}>
        <FormLabel>
          <Typography variant="h6">Upload Profile Picture</Typography>
        </FormLabel>
        <ImageUpload
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        {alert && (
          <Alert onClose={() => setAlert(false)}>
            Profile picture successfully changed!!!
          </Alert>
        )}
        <Box>
          <Button variant="contained" type="submit">
            Change Profile Picture
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default UpdateProfileImageForm;
