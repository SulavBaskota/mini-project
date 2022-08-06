import { Box, Container, useMediaQuery } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import FontSizeSpeedDial from "../components/FontSizeSpeedDial";
import ChapterCoreContent from "../components/ChapterCoreContent";
import ChapterComments from "../components/ChapterComments";
import ChapterNavigationButtons from "../components/ChapterNavigationButtons";
import { getSession } from "next-auth/react";

export default function Chapter({ chapterInfo }) {
  const paragraphs = chapterInfo.chapter_content.split("\n");
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
          <ChapterComments
            comments={chapterInfo.comment_list}
            chapter_id={chapterInfo._id}
          />
          {isVisible && (
            <FontSizeSpeedDial fontSize={fontSize} setFontSize={setFontSize} />
          )}
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { novel_id, chapter_number } = context.query;
  if (!novel_id || !chapter_number) {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
  const hostUrl = process.env.NEXTAUTH_URL;
  let user_id = null;
  if (session) user_id = session.user.id;
  const requestUrl = `${hostUrl}/api/chapter/chapter-info/${encodeURIComponent(
    novel_id
  )}/${encodeURIComponent(chapter_number)}/${encodeURIComponent(user_id)}`;
  let chapterInfo = {};
  await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (chapterInfo = res.data));

  return {
    props: {
      chapterInfo: chapterInfo,
    },
  };
}
