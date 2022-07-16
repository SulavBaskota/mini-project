import {
  Container,
  Pagination,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { BOOKMARKS_INFO } from "../constants/BOOKMARKS_INFO";
import { useState } from "react";
import BookmarkTile from "../components/book-tile/BookmarkTile";

export default function Bookmarks() {
  const [page, setPage] = useState(1);
  const count = Math.ceil(BOOKMARKS_INFO.length / 4);
  const [bookmarks, setBookmarks] = useState(BOOKMARKS_INFO.slice(0, 4));

  const handleChange = (event, value) => {
    setPage(value);
    setBookmarks(BOOKMARKS_INFO.slice((value - 1) * 4, value * 4));
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h5" mt={2}>
        Bookmarks
      </Typography>
      <Divider sx={{ border: 1, mt: 2 }} />
      {bookmarks.length > 0 ? (
        <>
          <Grid container columns={{ xs: 2, sm: 4 }} spacing={3} mt={1}>
            {bookmarks.map((bookmark, index) => (
              <Grid item xs={2} sm={2} key={index}>
                <BookmarkTile bookmark={bookmark} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={count}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
        </>
      ) : (
        <Typography variant="h5" color="secondary.light">
          No bookmarks to show
        </Typography>
      )}
    </Container>
  );
}
