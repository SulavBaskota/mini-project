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
import ExpandableTypography from "../components/ExpandableTypography";
import TitleInfo from "../components/TitleInfo";
import ContinueReadingButton from "../components/ContinueReadingButton";
import AddNewChapterButton from "./AddNewChapterButton";
import StartReadingButton from "./StartReadingButton";

export default function CompleteNovelDetail({ novel }) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
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
              <TitleInfo
                status={novel.status}
                title={novel.title}
                novelId={novel._id}
              />
              <Typography variant="body1" color="text.secondary">
                {novel.last_chapter} Chapters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author: {novel.author}
              </Typography>
              <Recommendation
                title={novel.title}
                rating={novel.rating}
                recommendation={novel.recommendation}
              />
              <ExpandableTypography
                desc={novel.desc}
                expandable={true}
                align="left"
              />
              <DisplayTags tags={novel.genre} />
              {/* <StartReadingButton /> */}
              {/* <ContinueReadingButton /> */}
              <AddNewChapterButton />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
