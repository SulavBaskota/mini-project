import {
  Container,
  Grid,
  Stack,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import Recommendation from "../components/Recommendation";
import DisplayTags from "../components/DisplayTags";
import NovelSynopsis from "../components/NovelSynopsis";
import TitleInfo from "../components/TitleInfo";
import { NOVEL } from "../constants/NOVEL";
import ContinueReadingButton from "../components/ContinueReadingButton";

export default function Novel() {
  const novel = NOVEL;
  return (
    <Container
      sx={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
    >
      <Box sx={{ maxWidth: "md" }}>
        <Grid
          container
          columns={{ xs: 1, sm: 12 }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          alignItems={{ xs: "center", sm: "flex-start" }}
          mt={4}
          spacing={2}
        >
          <Grid item xs={1} sm={4}>
            <CardMedia
              component="img"
              image={novel.img}
              alt={novel.title}
              height={{ xs: "500", sm: "420" }}
              sx={{ objectFit: "fill" }}
            />
          </Grid>
          <Grid item xs={1} sm={8}>
            <Stack spacing={2}>
              <TitleInfo status={novel.status} title={novel.title} />
              <Typography variant="body1" color="text.secondary">
                {novel.latestChapter} Chapters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author: {novel.author}
              </Typography>
              <Recommendation
                title={novel.title}
                rating={novel.rating}
                recommendation={novel.recommendation}
              />
              <NovelSynopsis desc={novel.desc} expandable={true} align="left" />
              <DisplayTags tags={novel.genre} />
              <ContinueReadingButton />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
