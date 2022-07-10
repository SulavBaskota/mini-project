import { Stack, Typography, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Divider } from "@mui/material";

export default function ChapterCoreContent({ chapterInfo, paragraphs, fontSize }) {
  return (
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
            disabled={chapterInfo.previous ? false : true}
            href="/chapter"
          >
            <ArrowBackOutlinedIcon />
          </Button>
          <Button
            disableRipple={true}
            sx={{ "&:hover": { background: "inherit" } }}
            disabled={chapterInfo.next ? false : true}
            href="/chapter"
          >
            <ArrowForwardOutlinedIcon />
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
  );
}
