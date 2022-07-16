import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import Link from "@mui/material/Link";

export default function ChangePasswordSuccessful({ username }) {
  const router = useRouter();
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ minHeight: "100vh" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ width: 100, height: 100, m: 1 }}
            color="success"
          />
          <Typography component="h1" variant="h5">
            Password changed successfully!
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" align="center">
              Please check the email address associated with the username{" "}
              <b>{username}</b> for your new pasword. If it doesn't arrive soon,
              check your spam folder.
            </Typography>
            <Stack>
              <Button
                variant="contained"
                onClick={signIn}
                sx={{ mt: 3, mb: 2 }}
              >
                Login Now
              </Button>
              <Link
                component="button"
                onClick={() => router.push("/forgot-password")}
              >
                Didn't receive an email?
              </Link>
            </Stack>
          </Box>
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
