import {
  Container,
  Pagination,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { useState } from "react";
import BookmarkTile from "../../components/book-tile/BookmarkTile";
import { getSession } from "next-auth/react";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";

export default function Bookmarks({ bookmarkInfo }) {
  const [page, setPage] = useState(1);
  const count = Math.ceil(bookmarkInfo.length / 4);
  const [bookmarks, setBookmarks] = useState(bookmarkInfo.slice(0, 4));
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
    setBookmarks(bookmarkInfo.slice((value - 1) * 4, value * 4));
  };

  const handleDelete = async (bookmark_id) => {
    setLoading(true);
    const requestData = {
      bookmark_id: bookmark_id,
    };
    const res = await fetch("/api/bookmark/delete-bookmark", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (!res.success) {
      router.push("/400");
      return;
    }
    router.reload();
    return;
  };

  return (
    <>
      {loading && <Loader open={loading} />}
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
                  <BookmarkTile
                    bookmark={bookmark}
                    handleDelete={handleDelete}
                  />
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
          <Typography
            variant="h5"
            color="secondary.light"
            align="center"
            mt={5}
          >
            No bookmarks to show
          </Typography>
        )}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const hostUrl = process.env.NEXTAUTH_URL;

  const requestUrl = `${hostUrl}/api/bookmark/get-my-bookmarks/${encodeURIComponent(
    session.user.id
  )}`;
  let bookmarkInfo = {};
  await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (bookmarkInfo = res.data));

  return {
    props: {
      bookmarkInfo: bookmarkInfo,
    },
  };
}