import { Box, Button, useMediaQuery } from "@mui/material";

export default function AddNewChapterButton({}) {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: mobileView ? "center" : "flex-start",
        pt: 4,
      }}
    >
      <Button
        href="/create-chapter"
        variant="contained"
        size="large"
        sx={{ borderRadius: 8 }}
      >
        Add New Chapter
      </Button>
    </Box>
  );
}
