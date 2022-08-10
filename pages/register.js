import { getSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signIn } from "next-auth/react";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { getRequestOptions } from "../src/Utils";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    userrole: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const confirmPassword = data.get("confirmPassword");
    const requestData = {
      username: data.get("username"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
      userrole: data.get("userrole"),
    };
    if (requestData.password !== confirmPassword) {
      setError({ ...error, confirmPassword: true });
      setLoading(false);
      return;
    }
    setError({ ...error, confirmPassword: false });

    try {
      const res = await fetch(
        "/api/register",
        getRequestOptions(requestData, "POST")
      );
      const data = await res.json();

      if (!res.ok) {
        throw data.error;
      }
      router.push({
        pathname: "/registration-success",
        query: { username: encodeURIComponent(requestData.username) },
      });
    } catch (err) {
      let errorType = err.errorType;
      setError({ ...error, [errorType]: true });
      setErrorMessage(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader open={loading} />}
      <Container component="main" maxWidth="xs" sx={{ minHeight: "100vh" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  type="text"
                  error={error.firstname}
                  helperText={error.firstname ? errorMessage : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  type="text"
                  error={error.lastname}
                  helperText={error.lastname ? errorMessage : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  type="text"
                  error={error.username}
                  helperText={error.username ? errorMessage : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  error={error.email}
                  helperText={error.email ? errorMessage : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  error={error.password}
                  helperText={error.password ? errorMessage : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  error={error.confirmPassword}
                  helperText={
                    error.confirmPassword ? "Passwords do not match" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userrole"
                  name="userrole"
                  label="Role"
                  select
                  defaultValue="reader"
                  error={error.userrole}
                  helperText={error.userrole ? errorMessage : ""}
                >
                  <MenuItem value="reader">Reader</MenuItem>
                  <MenuItem value="author">Author</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component="button"
                  onClick={() => signIn()}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
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
