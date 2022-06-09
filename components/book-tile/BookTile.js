import { Box, Grid, Paper } from "@mui/material";
import SmallBookTile from "./SmallBookTile";
import BookBigTile from "./BookBigTile";
import { useMediaQuery } from "@mui/material";

export default function BookTile({ bookList }) {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const book = bookList[0];
  const books = mobileView ? bookList.slice(1, 5) : bookList.slice(1);

  return (
    <Paper elevation={0} sx={{borderRadius: 4}}>
      <Box sx={{ flexGrow: 1, padding: "20px" }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 12 }}>
          <Grid item xs={1} sm={5}>
            <BookBigTile book={book} />
          </Grid>
          <Grid
            item
            xs={1}
            sm={7}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {books.map((item, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <SmallBookTile book={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
