import { Stack, Typography, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Divider } from "@mui/material";

export default function ChapterCoreContent({
  chapterInfo,
  paragraphs,
  fontSize,
}) {
  return (
    <Stack spacing={4}>
      <Stack justifyContent="space-between" direction="row">
        <Button
          color="secondary"
          href={`/novel?novel_id=${encodeURIComponent(chapterInfo.novel_id)}`}
          sx={{ "&:hover": { background: "inherit" } }}
          disableRipple={true}
        >
          <ArrowBackIosIcon fontSize="large" />
          <Typography variant="h6">{chapterInfo.novel_title}</Typography>
        </Button>
        <Stack direction="row">
          <Button
            disableRipple={true}
            sx={{ "&:hover": { background: "inherit" } }}
            disabled={chapterInfo.previous_chapter ? false : true}
            href={`/chapter?novel_id=${encodeURIComponent(
              chapterInfo.novel_id
            )}&chapter_number=${encodeURIComponent(
              chapterInfo.chapter_number - 1
            )}`}
          >
            <ArrowBackOutlinedIcon />
          </Button>
          <Button
            disableRipple={true}
            sx={{ "&:hover": { background: "inherit" } }}
            disabled={chapterInfo.next_chapter ? false : true}
            href={`/chapter?novel_id=${encodeURIComponent(
              chapterInfo.novel_id
            )}&chapter_number=${encodeURIComponent(
              chapterInfo.chapter_number + 1
            )}`}
          >
            <ArrowForwardOutlinedIcon />
          </Button>
        </Stack>
      </Stack>
      <Divider />
      <Typography variant="h5" fontWeight="bold">
        Chapter {chapterInfo.chapter_number}: {chapterInfo.chapter_title}
      </Typography>
      <Stack spacing={2}>
        {paragraphs.map((paragraph, index) => (
          <Typography variant="body1" key={index} fontSize={fontSize}>
            {paragraph}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
