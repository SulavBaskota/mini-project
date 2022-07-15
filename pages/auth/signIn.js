import { getCsrfToken, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const { error } = router.query;

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Box
        component="form"
        method="post"
        action="/api/auth/callback/credentials"
        autoComplete="off"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            width: 400,
            maxWidth: "100%",
            border: { xs: "none", sm: "1px solid" },
            borderRadius: { xs: 0, sm: 2 },
            padding: 2,
            marginTop: { xs: "0", sm: "30%" },
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" align="center">
              Welcome to ReadHub
            </Typography>
            <TextField
              name="csrfToken"
              type="hidden"
              defaultValue={csrfToken}
              sx={{ display: "none" }}
            />
            {error === "CredentialsSignin" && (
              <Typography variant="body1" color="error">
                Sign in failed. Check the details you provided are correct.
              </Typography>
            )}
            <TextField name="username" label="Username" type="text" />
            <TextField name="password" label="Password" type="password" />
            <Button href="/forgot-password">Forgot password?</Button>
            <Button type="submit" variant="contained">
              Sign in
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
