import { Container, Pagination } from "@mui/material";
import { BOOKMARKS_INFO } from "../constants/BOOKMARKS_INFO";
import { useState } from "react";
import BookmarkTile from "../components/book-tile/BookmarkTIle";

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
      {bookmarks.map((bookmark, index) => (
        <BookmarkTile bookmark={bookmark} key={index} />
      ))}
      <Pagination
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Container>
  );
}
