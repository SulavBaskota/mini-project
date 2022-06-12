import {
  FormControl,
  Button,
  Container,
  Grid,
  Box,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import RadioGroupComponent from "../components/RadioButtonComponent";
import { BOOKS_WITH_TAGS } from "../constants/BOOKS_WITH_TAGS";
import HorizontalBookTile from "../components/book-tile/HorizontalBookTile";
import GenreAccordion from "../components/GenreAccordion";

const status = ["Any", "Ongoing", "Completed", "Hiatus"];
const sortBy = ["Name", "Popular", "New", "Rating"];
const genres = {
  Action: false,
  Fantasy: false,
  "Sci Fi": false,
  Mystery: false,
  Thriller: false,
  Romance: false,
  Dystopian: false,
  Horror: false,
};

export default function Series() {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [statusValue, setStatusValue] = useState("Any");
  const [sortByValue, setSortByValue] = useState("Name");
  const [genresValue, setGenresValue] = useState(genres);

  return (
    <Container sx={{ mt: 2, minHeight: "100vh" }}>
      <Stack spacing={3}>
        <FormControl>
          <RadioGroupComponent
            id="status"
            label="Status"
            value={statusValue}
            itemList={status}
            setValue={setStatusValue}
          />
          <RadioGroupComponent
            id="sort-by"
            label="Sort By"
            value={sortByValue}
            itemList={sortBy}
            setValue={setSortByValue}
          />
        </FormControl>
        <GenreAccordion
          value={genresValue}
          itemDict={genres}
          setValue={setGenresValue}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: mobileView ? "left" : "right",
          }}
        >
          <Button variant="contained">Apply Filters</Button>
        </Box>
        <Grid
          container
          // spacing={2}
          columns={{ xs: 1, sm: 2 }}
          // pl={2}
          alignItems="center"
          justifyContent="center"
        >
          {BOOKS_WITH_TAGS.map((book, index) => (
            <Grid
              item
              xs={1}
              sm={1}
              key={index}
              sx={{ paddingBottom: 3, paddingRight: 2 }}
            >
              <HorizontalBookTile book={book} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
