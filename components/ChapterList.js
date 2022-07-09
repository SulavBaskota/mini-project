import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import TabsComponentTemplate from "./TabsComponentTemplate";

const ChapterListSubComponent = ({ list }) => (
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
);

export default function ChapterList({
  chapters,
  descOrderChapter,
  setDescOrderChapter,
}) {
  // Initial chapters array should be in descending order
  const itemPerPage = 20;
  const [list, setList] = useState(chapters.slice(0, itemPerPage));

  return (
    <TabsComponentTemplate
      itemList={chapters}
      itemPerPage={itemPerPage}
      setList={setList}
      descending={descOrderChapter}
      setDescending={setDescOrderChapter}
      subComponent={<ChapterListSubComponent list={list} />}
    />
  );
}
