import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    await fetch("/api/change-password", {
      method: "POST",
      body: JSON.stringify({ username: username, email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok)
          router.push(
            {
              pathname: "/change-password-success",
              query: { username: username },
            },
            "/change-password-success"
          );
        return res.json();
      })
      .then((data) => setData(data));
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Box
        component="form"
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
              Enter your account details
            </Typography>
            {data && data.error && (
              <Typography variant="body1" color="error">
                Password change failed. Check the details you provided are
                correct.
              </Typography>
            )}
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSubmit} variant="contained">
              Change Password
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
    props: {},
  };
}
