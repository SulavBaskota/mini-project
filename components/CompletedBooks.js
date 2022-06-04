import { Container, Typography } from "@mui/material";
import { COMPLETED_BOOKS } from "../constants/COMPLETED_BOOKS";
import BookTile from "./BookTile";

export default function CompletedBooks() {
  return (
    <Container
      sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
    >
      <Typography variant="h5" mt={3} mb={3} pl={{ xs: 2, sm: 0 }}>
        Completed
      </Typography>
      <BookTile bookList={COMPLETED_BOOKS} />
    </Container>
  );
}
