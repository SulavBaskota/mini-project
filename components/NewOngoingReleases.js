import { Container, Typography, useMediaQuery } from "@mui/material";
import { NEW_BOOKS } from "../constants/NEW_BOOKS";
import BookTile from "./BookTile";

export default function NewOngoingReleases() {
  return (
    <Container
      sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
    >
      <Typography variant="h5" mt={3} mb={3} pl={{ xs: 2, sm: 0 }}>
        New Ongoing Releases
      </Typography>
      <BookTile bookList={NEW_BOOKS} />
    </Container>
  );
}
