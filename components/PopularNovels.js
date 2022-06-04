import React from "react";
import { Container, Paper, Typography, useMediaQuery } from "@mui/material";
import Carousel from "react-grid-carousel";
import SmallBookTile from "./SmallBookTile";
import { POPULAR_BOOKS } from "../constants/POPULAR_BOOKS";

export default function PopularNovels() {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Container
      sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
    >
      <Typography variant="h5" mt={3} mb={3} pl={{ xs: 2, sm: 0 }}>
        Popular Novels
      </Typography>
      <Carousel
        cols={4}
        rows={1}
        gap={10}
        loop={true}
        autoplay={mobileView ? 2000 : undefined}
      >
        {POPULAR_BOOKS.map((book, index) => (
          <Carousel.Item index={index}>
            <SmallBookTile book={book} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
