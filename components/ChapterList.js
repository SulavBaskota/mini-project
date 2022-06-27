import { Grid, Pagination, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function ChapterList({ chapters }) {
  // Initial chapters array should be in reverse order, this needs to be sorted later
  const [order, setOrder] = useState(true);
  const [page, setPage] = useState(1);
  const count = Math.ceil(chapters.length / 20);
  const [list, setList] = useState(chapters.slice(0, 20));

  const handleChange = (event, value) => {
    setPage(value);
    setList(chapters.slice((value - 1) * 20, value * 20));
  };

  const handleClick = (event) => {
    setOrder(!order);
    chapters = chapters.reverse();
    setList(chapters.slice((page - 1) * 20, page * 20));
  };

  return (
    <>
      {console.log(chapters)}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleClick} color="secondary">
          {order ? <FilterListIcon /> : <FilterListOffIcon />}
        </Button>
      </Box>
      <Grid container columns={{ xs: 2, sm: 4 }} spacing={1.5} mt={1}>
        {list.map((chapter, index) => (
          <Grid item xs={2} sm={2} key={index}>
            <Typography
              variant="body1"
              component="a"
              href="/"
              color="secondary"
              sx={{ textDecoration: "none" }}
            >
              Chapter {chapter.id}: {chapter.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        sx={{ mt: 4 }}
      />
    </>
  );
}
