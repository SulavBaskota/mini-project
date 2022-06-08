import React from "react";
import { useMediaQuery } from "@mui/material";
import Carousel from "react-grid-carousel";
import SmallBookTile from "./book-tile/SmallBookTile";
import { POPULAR_BOOKS } from "../constants/POPULAR_BOOKS";
import HomeSectionTemplate from "./HomeSectionTemplate";

const CarouselSubComponent = ({ mobileView }) => (
  <Carousel
    cols={4}
    rows={1}
    gap={10}
    loop={true}
    autoplay={mobileView ? 2000 : undefined}
  >
    {POPULAR_BOOKS.map((book, index) => (
      <Carousel.Item key={index}>
        <SmallBookTile book={book} />
      </Carousel.Item>
    ))}
  </Carousel>
);

export default function PopularNovels() {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <HomeSectionTemplate
      sectionTitle={"Popular Novels"}
      lowLevelComp={<CarouselSubComponent mobileView={mobileView} />}
    />
  );
}
