import * as React from "react";
import Image from "next/image";
import {
  Button,
  Typography,
  Grid,
  Stack,
  Rating,
  Paper,
  Divider,
} from "@mui/material";

export default function HorizontalBookTile({ book }) {
  const handleClick = () => {};

  return (
    <>
      <Button onClick={handleClick} sx={{ paddingLeft: 0 }}>
        <Grid container direction="row">
          <Grid item xs={4} sm={3} align="left">
            <Paper sx={{ width: 120 }}>
              <Typography align="center">{book.status}</Typography>
            </Paper>
            <Image
              src={book.img}
              alt={book.title}
              layout="intrinsic"
              width={120}
              height={180}
            />
          </Grid>
          <Grid
            item
            xs={8}
            sm={9}
            align="left"
            sx={{ paddingRight: 3, paddingLeft: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                align="left"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                {book.title}
              </Typography>
              <Stack direction="row" spacing={0.5}>
                <Rating
                  name={book.title}
                  size="small"
                  value={parseFloat(book.rating)}
                  precision={0.1}
                  readOnly
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="left"
                >
                  {book.rating} stars
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                align="left"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  textTransform: "none",
                }}
              >
                {book.desc}
              </Typography>
              <Stack direction="row" spacing={1}>
                {book.genre.map((item, index) => (
                  <Paper key={index}>
                    <Typography sx={{ p: 0.5 }}>{item}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Button>
      <Divider />
    </>
  );
}
