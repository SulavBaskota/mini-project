import { Container, Typography } from "@mui/material";

export default function Custom401() {
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
        401 - Unauthorized
      </Typography>
    </Container>
  );
}
