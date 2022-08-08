import { Typography, Box, Stack, Button, FormLabel } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import ImageUpload from "../../../components/ImageUpload";
import Loader from "../../../components/Loader";
import { uploadImage } from "../../../src/Utils";
import { getRequestOptions } from "../../../src/Utils";

const UpdateProfileImageForm = ({ userInfo, setUserInfo }) => {
  const [alert, setAlert] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const handleUpdateProfilePicture = async (event) => {
    event.preventDefault();
    if (!selectedImage) return;
    setLoading(true);
    const imgData = new FormData();
    imgData.append("file", selectedImage);
    imgData.append("upload_preset", "profile-pics");

    const cloudinaryResponse = await uploadImage(imgData).then((res) =>
      res.json()
    );

    const requestData = {
      id: userInfo._id,
      imgUrl: cloudinaryResponse.secure_url,
    };

    const res = await fetch(
      "/api/user/udpate-account/update-profile-image",
      getRequestOptions(requestData, "PUT")
    ).then((res) => res.json());
    setLoading(false);
    if (res.success) {
      setSelectedImage(null);
      setUserInfo({ ...userInfo, imgUrl: requestData.imgUrl });
      setAlert(true);
    }
    reloadSession();
  };

  return (
    <>
      {loading && <Loader open={loading} />}
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
    </>
  );
};

export default UpdateProfileImageForm;
