import { Box, Button, useMediaQuery } from "@mui/material";

export default function StartReadingButton() {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: mobileView ? "center" : "flex-start",
        pt: 4,
      }}
    >
      <Button variant="contained" size="large" sx={{ borderRadius: 8 }}>
        Start Reading
      </Button>
    </Box>
  );
}
