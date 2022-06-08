import {
  FormControl,
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  FormGroup,
  Checkbox,
  Button,
  Container,
  FormLabel,
  Grid,
} from "@mui/material";
import { useState } from "react";
import RadioGroupComponent from "../components/RadioButtonComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BOOKS_WITH_TAGS } from "../constants/BOOKS_WITH_TAGS";
import HorizontalBookTile from "../components/book-tile/HorizontalBookTile";

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
  const [statusValue, setStatusValue] = useState("Any");
  const [sortByValue, setSortByValue] = useState("Name");
  const [genresValue, setGenresValue] = useState(genres);

  const handleChange = (event) => {
    setGenresValue({
      ...genresValue,
      [event.target.name]: event.target.checked,
    });
  };

  const clearGenreSelections = () => {
    setGenresValue(genres);
  };

  return (
    <Container sx={{ pt: 4 }}>
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
      <FormLabel>
        <Typography variant="h6">Genres</Typography>
      </FormLabel>
      <Accordion sx={{ backgroundColor: "#202020" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {genresValue === genres ? (
            <Typography sx={{ color: "#777777" }}>Select</Typography>
          ) : (
            <Grid container spacing={2} columns={{ xs: 3, sm: 8, md: 12 }}>
              {Object.keys(genresValue).map((item, index) =>
                genresValue[item] === true ? (
                  <Grid item xs={1} sm={2} md={2} key={index}>
                    <Button
                      variant="outlined"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {item}
                    </Button>
                  </Grid>
                ) : null
              )}
            </Grid>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {Object.keys(genresValue).map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={genresValue[item]}
                    onChange={handleChange}
                    name={item}
                  />
                }
                label={item}
                key={index}
              />
            ))}
          </FormGroup>
          <Button onClick={clearGenreSelections}>Clear All</Button>
        </AccordionDetails>
      </Accordion>
      <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
        {BOOKS_WITH_TAGS.map((book, index) => (
          <Grid item xs={1} sm={1} key={index}>
            <HorizontalBookTile book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
