import {
  Container,
  Typography,
  Box,
  Divider,
  Stack,
  Button,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ImageUpload from "../../../components/ImageUpload";
import { getSession } from "next-auth/react";
import UpdateEmailForm from "./components/updateEmailForm";
import UpdateNameForm from "./components/updateNameForm";
import UpdatePasswordForm from "./components/updatePasswordForm";

export default function Profile({ accountInfo }) {
  const [userInfo, setUserInfo] = useState(accountInfo);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  console.log(userInfo);
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack spacing={2} mt={2}>
        <Typography variant="h5">User Profile</Typography>
        <Divider />
      </Stack>
      <Box mt={2} display="flex" alignItems="center" justifyContent="center">
        <Box sx={{ width: 900, maxWidth: "100%" }}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center">
              <AccountCircleIcon sx={{ width: 100, height: 100 }} />
              <Typography variant="h4">{userInfo.username}</Typography>
            </Stack>
            <Divider />
            <UpdateNameForm userInfo={userInfo} setUserInfo={setUserInfo} />
            <Divider />
            <UpdateEmailForm userInfo={userInfo} setUserInfo={setUserInfo} />
            <Divider />
            <UpdatePasswordForm userInfo={userInfo} />
            <Divider />
            <FormLabel>
              <Typography variant="h6">Upload Profile Picture</Typography>
            </FormLabel>
            <ImageUpload
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
            <Box>
              <Button variant="contained">Change Profile Picture</Button>
            </Box>
            <Divider />
            <Stack direction={"row"} justifyContent="flex-end" spacing={2}>
              <Button href="/" color="error" variant="outlined">
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const hostUrl = process.env.URL;
  const id = session.user.id;
  const requestUrl =
    hostUrl + "/api/user/account-info/" + encodeURIComponent(id);
  let accountInfo;
  await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (accountInfo = res.data));
  return {
    props: { accountInfo: accountInfo },
  };
}
