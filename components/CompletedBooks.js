import { Container, Typography } from "@mui/material";
import { COMPLETED_BOOKS } from "../constants/COMPLETED_BOOKS";
import BookTile from "./BookTile";

export default function CompletedBooks() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" mt={3} mb={3}>
        Completed
      </Typography>
      <BookTile bookList={COMPLETED_BOOKS} />
    </Container>
  );
}
