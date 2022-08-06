import { Box, Button, useMediaQuery } from "@mui/material";

export default function StartReadingButton({ novel_id }) {
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
        variant="contained"
        size="large"
        sx={{ borderRadius: 8 }}
        href={`/chapter?novel_id=${encodeURIComponent(
          novel_id
        )}&chapter_number=1`}
      >
        Start Reading
      </Button>
    </Box>
  );
}
