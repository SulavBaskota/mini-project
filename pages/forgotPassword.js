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

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/change-password", {
      method: "POST",
      body: JSON.stringify({ username: username, email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Box
        component="form"
        // method="post"
        // action="/api/change-password"
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
            <Typography variant="body1">Enter you account details.</Typography>
            <TextField
              //   name="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              //   name="email"
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
