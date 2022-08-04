import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function AddNewChapterButton({
  novel_title,
  novel_id,
  last_chapter,
}) {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", sm: "flex-start" },
        pt: 4,
      }}
    >
      <Button
        onClick={() =>
          router.push({
            pathname: "/author/create-chapter",
            query: {
              novel_title: encodeURIComponent(novel_title),
              novel_id: encodeURIComponent(novel_id),
              last_chapter: encodeURIComponent(last_chapter),
            },
          })
        }
        variant="contained"
        size="large"
        sx={{ borderRadius: 8 }}
      >
        Add New Chapter
      </Button>
    </Box>
  );
}
