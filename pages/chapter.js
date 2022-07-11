import { Box, Container, useMediaQuery } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { CHAPTER } from "../constants/CHAPTER";
import FontSizeSpeedDial from "../components/FontSizeSpeedDial";
import ChapterCoreContent from "../components/ChapterCoreContent";
import ChapterComments from "../components/ChapterComments";
import ChapterNavigationButtons from "../components/ChapterNavigationButtons";

export default function Chapter() {
  const chapterInfo = CHAPTER;
  const paragraphs = chapterInfo.content.split("\n");
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [isVisible, setIsVisible] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    const fontSize = JSON.parse(localStorage.getItem("fontSize"));
    if (fontSize) {
      setFontSize(fontSize);
    }
  }, []);

  const listenToScroll = useCallback((event) => {
    let heightToHideFrom =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight -
      (mobileView ? 250 : 200);
    const winScroll = document.documentElement.scrollTop;
    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  return (
    <Container sx={{ minHeight: "100vh", pt: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box sx={{ width: 900, maxWidth: "100%" }}>
          <ChapterCoreContent
            chapterInfo={chapterInfo}
            paragraphs={paragraphs}
            fontSize={fontSize}
          />
          <ChapterNavigationButtons chapterInfo={chapterInfo} />
          <ChapterComments comments={chapterInfo.comments} />
          {isVisible && (
            <FontSizeSpeedDial fontSize={fontSize} setFontSize={setFontSize} />
          )}
        </Box>
      </Box>
    </Container>
  );
}
