import {
  FormControl,
  Button,
  Container,
  Grid,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import { useState } from "react";
import RadioGroupComponent from "../components/RadioButtonComponent";
import HorizontalBookTile from "../components/book-tile/HorizontalBookTile";
import CheckboxesTags from "../components/CheckboxesTags";
import Loader from "../components/Loader";

const status = ["Any", "Ongoing", "Completed", "Hiatus"];
const sortBy = ["Name", "Popular", "New", "Rating"];

export default function Series({ completeNovelList }) {
  const [statusValue, setStatusValue] = useState("Any");
  const [sortByValue, setSortByValue] = useState("Name");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [novelList, setNovelList] = useState(completeNovelList);
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setNovelList(completeNovelList);
    setSortByValue("Name");
    setStatusValue("Any");
    setSelectedGenres([]);
  };

  const handleFilter = async (event) => {
    event.preventDefault();
    setLoading(true);
    let requestData = {
      sort_by: sortByValue,
      status: statusValue,
      genres: selectedGenres,
    };

    const res = await fetch("/api/novel/filter-novels", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setNovelList(res.data);
    setLoading(false);
    return;
  };

  return (
    <>
      {loading && <Loader open={loading} />}
      <Container sx={{ minHeight: "100vh" }}>
        <Stack spacing={2} mt={2}>
          <FormControl>
            <RadioGroupComponent
              id="status"
              label="Status"
              value={statusValue}
              itemList={status}
              setValue={setStatusValue}
            />
          </FormControl>
          <FormControl>
            <RadioGroupComponent
              id="sort-by"
              label="Sort By"
              value={sortByValue}
              itemList={sortBy}
              setValue={setSortByValue}
            />
          </FormControl>
          <CheckboxesTags
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <Stack spacing={1} direction="row" justifyContent="flex-end">
            <Button variant="outlined" color="error" onClick={handleClear}>
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={handleFilter}
              disabled={
                statusValue === "Any" &&
                selectedGenres.length === 0 &&
                sortByValue === "Name"
                  ? true
                  : false
              }
            >
              Apply Filters
            </Button>
          </Stack>
        </Stack>
        {novelList.length > 0 ? (
          <Grid container columns={{ xs: 1, sm: 2 }} spacing={3} mt={2}>
            {novelList.map((book, index) => (
              <Grid item xs={1} sm={1} key={index}>
                <HorizontalBookTile book={book} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box mt={3}>
            <Alert onClose={handleClear} severity="error">
              Sorry! No result match your search!
            </Alert>
          </Box>
        )}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const hostUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const requestUrl = `${hostUrl}/api/novel/get-all-novels`;
  let completeNovelList = {};
  await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (completeNovelList = res.data));
  return {
    props: {
      completeNovelList: completeNovelList,
    },
  };
}
