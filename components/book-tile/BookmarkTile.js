import {
  Paper,
  Button,
  Stack,
  Grid,
  Typography,
  IconButton,
  LinearProgress,
  Box,
  useMediaQuery,
  CardMedia,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function BookmarkTile({ bookmark, handleDelete }) {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const progress =
    (parseInt(bookmark.bookmark) / parseInt(bookmark.novel.last_chapter)) * 100;

  return (
    <>
      <Paper sx={{ borderRadius: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ p: 1 }}
        >
          <Grid item xs={4} md={3} sx={{ paddingRight: 1.5 }}>
            <CardMedia
              component="img"
              image={bookmark.novel.img}
              alt={bookmark.novel.title}
              height="160"
              sx={{ objectFit: "fill" }}
            />
          </Grid>
          <Grid item xs={6} md={7} align="left">
            <Stack spacing={2}>
              <Typography variant={mobileView ? "subtitle1" : "h5"}>
                {bookmark.novel.title}
              </Typography>
              <Stack>
                <Typography variant="body1" color="secondary.light">
                  You have read {bookmark.bookmark}/
                  {bookmark.novel.last_chapter}
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
              </Stack>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ width: 160 }}
                href={`/chapter?novel_id=${encodeURIComponent(
                  bookmark.novel._id
                )}&chapter_number=${encodeURIComponent(bookmark.bookmark)}`}
              >
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}
                >
                  Continue Reading
                </Typography>
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={2} md={2}>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleDelete(bookmark._id)}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
