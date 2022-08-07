import {
  Container,
  Typography,
  Box,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getSession } from "next-auth/react";
import UpdateEmailForm from "./components/updateEmailForm";
import UpdateNameForm from "./components/updateNameForm";
import UpdatePasswordForm from "./components/updatePasswordForm";
import UpdateProfileImageForm from "./components/updateProfileImage";
import Avatar from "@mui/material/Avatar";

export default function Profile({ accountInfo }) {
  const [userInfo, setUserInfo] = useState(accountInfo);

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack spacing={2} mt={2}>
        <Typography variant="h5">User Profile</Typography>
        <Divider />
      </Stack>
      <Box mt={2} display="flex" alignItems="center" justifyContent="center">
        <Box sx={{ width: 900, maxWidth: "100%" }}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              {userInfo.imgUrl ? (
                <Avatar
                  alt={userInfo.username}
                  src={userInfo.imgUrl}
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <AccountCircleIcon sx={{ width: 100, height: 100 }} />
              )}
              <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
                {userInfo.username}
              </Typography>
            </Stack>
            <Divider />
            <UpdateNameForm userInfo={userInfo} setUserInfo={setUserInfo} />
            <Divider />
            <UpdateEmailForm userInfo={userInfo} setUserInfo={setUserInfo} />
            <Divider />
            <UpdatePasswordForm userInfo={userInfo} />
            <Divider />
            <UpdateProfileImageForm
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
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
  const hostUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const id = session.user.id;
  const requestUrl =
    hostUrl + "/api/user/account-info/" + encodeURIComponent(id);
  let accountInfo = {};
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
