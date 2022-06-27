import { Stack, Box } from "@mui/material";
import TabsComponent from "../components/TabsComponent";
import CompleteNovelDetail from "../components/CompleteNovelDetail";
import { NOVEL } from "../constants/NOVEL";

export default function Novel() {
  const novel = NOVEL;
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Stack
          spacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CompleteNovelDetail novel={novel} />
          <TabsComponent chapters={novel.chapterList} />
        </Stack>
      </Box>
    </>
  );
}
