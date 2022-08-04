import { Box, Stack, Button, Typography } from "@mui/material";

export default function ChapterNavigationButtons({ chapterInfo }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: 4,
      }}
    >
      <Stack spacing={1}>
        <Button
          variant="contained"
          size="large"
          sx={{
            display: chapterInfo.next_chapter ? "" : "none",
            borderRadius: 8,
          }}
          href={`/chapter?novel_id=${encodeURIComponent(
            chapterInfo.novel_id
          )}&chapter_number=${encodeURIComponent(
            chapterInfo.chapter_number + 1
          )}`}
        >
          Next Chapter
        </Button>
        <Button
          variant="text"
          sx={{
            display: chapterInfo.previous_chapter ? "" : "none",
            "&:hover": { background: "inherit" },
          }}
          href={`/chapter?novel_id=${encodeURIComponent(
            chapterInfo.novel_id
          )}&chapter_number=${encodeURIComponent(
            chapterInfo.chapter_number - 1
          )}`}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textDecoration: "underline" }}
          >
            Previous Chapter
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}
