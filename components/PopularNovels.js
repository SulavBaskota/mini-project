import React from "react";
import { useMediaQuery } from "@mui/material";
import Carousel from "react-grid-carousel";
import SmallBookTile from "./book-tile/SmallBookTile";
import { POPULAR_BOOKS } from "../constants/POPULAR_BOOKS";
import HomeSectionTemplate from "./HomeSectionTemplate";
import PopularMobileBookCard from "./book-tile/PopularMobileBookCard";

const MyDot = ({ isActive }) => (
  <span
    style={{
      display: "inline-block",
      height: "10px",
      width: "10px",
      borderRadius: 5,
      border: "1px solid white",
      background: isActive ? "#ffffff" : "none",
    }}
  ></span>
);

const CarouselSubComponent = ({ mobileView }) => (
  <Carousel
    cols={mobileView ? 2 : 4}
    rows={1}
    gap={10}
    loop={true}
    showDots={true}
    autoplay={mobileView ? 3000 : undefined}
    dot={MyDot}
  >
    {POPULAR_BOOKS.map((book, index) => (
      <Carousel.Item key={index}>
        {mobileView ? (
          <PopularMobileBookCard book={book} index={index} />
        ) : (
          <SmallBookTile book={book} />
        )}
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
