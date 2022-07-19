import { Container, Typography, Box, Button, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function ResigrationSuccess({ username }) {
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
            Registration successfully!
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" align="center">
              Congratulations <b>{username}</b>, your account has been
              successfully created.
            </Typography>
            <Stack>
              <Button
                variant="contained"
                onClick={signIn}
                sx={{ mt: 3, mb: 2 }}
              >
                Login Now
              </Button>
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
        destination: "/register",
        permanent: false,
      },
    };
  }
  return {
    props: { username: username },
  };
}
