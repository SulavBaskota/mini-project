import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function ChangePasswordSuccessful({ username }) {
  const router = useRouter();
  return (
    <>
      <Container sx={{ minHeight: "100vh" }}>
        <Box sx={{ mt: { xs: 2, sm: "30%" } }}>
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <MailOutlineIcon sx={{ width: 100, height: 100 }} color="success" />
            <Typography variant="h5" align="center">
              Check Your Email
            </Typography>
            <Typography variant="body1" align="center">
              Please check the email address associated with the username{" "}
              <b>{username}</b> for your new pasword. If it doesn't arrive soon,
              check your spam folder.
            </Typography>
            <Button variant="contained" onClick={signIn}>
              Log In
            </Button>
            <Button onClick={() => router.push("/forgot-password")}>
              Didn't receive an email?
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { username } = context.query;

  if (session || !username) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      username: username,
    },
  };
}
