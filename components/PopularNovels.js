import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import Carousel from "react-grid-carousel";
import theme from "../src/theme";

export default function PopularNovels() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" mt={3} mb={3} w>
        Popular Novels
      </Typography>
      {/* <Paper elevation={0} sx={{paddingTop: "10px", paddingBottom: "5px"}}> */}
      <Carousel cols={3} rows={1} gap={10} loop={true}>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=1" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=2" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=3" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=4" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=5" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=6" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=7" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=8" />
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" src="https://picsum.photos/800/600?random=9" />
        </Carousel.Item>
      </Carousel>
      {/* </Paper> */}
    </Container>
  );
}
