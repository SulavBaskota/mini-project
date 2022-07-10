import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { CHAPTER } from "../constants/CHAPTER";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Divider } from "@mui/material";
import FontSizeSpeedDial from "../components/FontSizeSpeedDail";

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

  const listenToScroll = useCallback((event) => {
    let heightToHideFrom =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight -
      (mobileView ? 350 : 200);
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
          <Stack spacing={4}>
            <Stack justifyContent="space-between" direction="row">
              <Button
                color="secondary"
                href="/novel"
                sx={{ "&:hover": { background: "inherit" } }}
                disableRipple={true}
              >
                <ArrowBackIosIcon fontSize="large" />
                <Typography variant="h6">{chapterInfo.book}</Typography>
              </Button>
              <Stack direction="row">
                <Button
                  disableRipple={true}
                  sx={{ "&:hover": { background: "inherit" } }}
                >
                  <ArrowBackOutlinedIcon color="secondary" />
                </Button>
                <Button
                  disableRipple={true}
                  sx={{ "&:hover": { background: "inherit" } }}
                >
                  <ArrowForwardOutlinedIcon color="secondary" />
                </Button>
              </Stack>
            </Stack>
            <Divider />
            <Typography variant="h5" fontWeight="bold">
              Chapter {chapterInfo.id}: {chapterInfo.title}
            </Typography>
            <Stack spacing={2}>
              {paragraphs.map((paragraph, index) => (
                <Typography variant="body1" key={index} fontSize={fontSize}>
                  {paragraph}
                </Typography>
              ))}
            </Stack>
          </Stack>
          {isVisible && (
            <FontSizeSpeedDial fontSize={fontSize} setFontSize={setFontSize} />
          )}
        </Box>
      </Box>
    </Container>
  );
}
