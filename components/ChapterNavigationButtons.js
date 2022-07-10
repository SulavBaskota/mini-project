import { Box, Stack, Button, Typography } from "@mui/material";

export default function ChapterNavigationButtons({chapterInfo}) {
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
            display: chapterInfo.next ? "" : "none",
            borderRadius: 8,
          }}
          href="/chapter"
        >
          Next Chapter
        </Button>
        <Button
          variant="text"
          sx={{
            display: chapterInfo.previous ? "" : "none",
            "&:hover": { background: "inherit" },
          }}
          href="/chapter"
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
