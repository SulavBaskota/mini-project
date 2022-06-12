import * as React from "react";
import Image from "next/image";
import {
  Button,
  Typography,
  Stack,
  Box,
  CardMedia,
  Card,
  CardActionArea,
  CardContent,
  useMediaQuery,
} from "@mui/material";

export default function SmallBookTile({ book }) {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box>
      <CardActionArea>
        <CardMedia
          component="img"
          image={book.img}
          alt={book.title}
          height={mobileView ? "180" : "200"}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            align="center"
            sx={{ textTransform: "capitalize" }}
          >
            {book.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Box>
  );
}
