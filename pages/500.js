import { Container, Typography } from "@mui/material";

export default function Custom500() {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Typography variant="h5" align="center">
        500 - Server-side error occurred
      </Typography>
    </Container>
  );
}
