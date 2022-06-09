import {
  Paper,
  Button,
  Stack,
  Grid,
  Typography,
  IconButton,
  LinearProgress,
  Box,
} from "@mui/material";
import Image from "next/image";

import ClearIcon from "@mui/icons-material/Clear";
import { flexbox } from "@mui/system";

export default function BookmarkTile({ bookmark }) {
  const progress =
    (parseInt(bookmark.bookmark) / parseInt(bookmark.total)) * 100;
  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ p: 1 }}
      >
        <Grid item xs={4} sm={3}>
          <Image
            src={bookmark.img}
            alt={bookmark.title}
            layout="intrinsic"
            width={110}
            height={160}
          />
        </Grid>
        <Grid item xs={6} sm={7} align="left">
          <Stack spacing={2}>
            <Typography variant="h5">{bookmark.title}</Typography>
            <Stack>
              <Typography variant="body1" color="secondary.light">
                You have read {bookmark.bookmark}/{bookmark.total}
              </Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Stack>
            <Button variant="outlined" color="secondary" sx={{ width: 160 }}>
              <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                Continue Reading
              </Typography>
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={2}>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <IconButton aria-label="delete" size="small">
              <ClearIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
