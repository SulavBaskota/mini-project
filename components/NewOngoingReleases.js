import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import BookTile from "./BookTile";
import BookBigTile from "./BookBigTile";

export default function NewOngoingReleases() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" mt={3} mb={3}>
        New Ongoing Releases
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Paper sx={{ padding: "10px" }} elevation={0}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 12 }}
          >
            <Grid item xs={1} sm={5}>
              <BookBigTile />
            </Grid>
            <Grid
              item
              xs={1}
              sm={7}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <BookTile />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
