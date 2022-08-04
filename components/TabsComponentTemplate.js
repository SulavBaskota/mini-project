import { Pagination, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function TabsComponentTemplate({
  itemList,
  itemPerPage,
  setList,
  descending,
  setDescending,
  subComponent,
}) {
  const [page, setPage] = useState(1);
  const count = Math.ceil(itemList.length / itemPerPage);

  const handleChange = (event, value) => {
    setPage(value);
    setList(itemList.slice((value - 1) * itemPerPage, value * itemPerPage));
  };

  const handleClick = (event) => {
    setDescending(!descending);
    itemList = itemList.reverse();
    setList(itemList.slice((page - 1) * itemPerPage, page * itemPerPage));
  };

  return (
    <>
      {itemList.length > 0 ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={handleClick}
            color="secondary"
            endIcon={descending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          >
            <Typography variant="body1">{descending ? "AZ" : "ZA"}</Typography>
          </Button>
        </Box>
      ) : null}
      {subComponent}
      {itemList.length > 0 ? (
        <Pagination
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          sx={{ mt: 4 }}
        />
      ) : null}
    </>
  );
}
