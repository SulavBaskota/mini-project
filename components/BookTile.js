import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { NEW_BOOKS } from "../constants/NEW_BOOKS";
import Image from "next/image";
import { Button, Typography, Stack } from "@mui/material";

export default function BookTile() {
  const books = NEW_BOOKS.slice(1);

  const handleClick = () => {};

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {books.map((book, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button key={index} onClick={handleClick}>
                  <Stack direction="column" spacing={1}>
                    <Image
                      src={book.img}
                      alt={book.title}
                      layout="intrinsic"
                      width={100}
                      height={140}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {book.title}
                    </Typography>
                  </Stack>
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
