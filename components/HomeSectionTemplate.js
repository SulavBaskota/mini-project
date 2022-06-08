import { Container, Typography } from "@mui/material";

export default function HomeSectionTemplate({ sectionTitle, lowLevelComp }) {
  return (
    <Container
      sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
    >
      <Typography variant="h4" mt={3} mb={3} pl={{ xs: 2, sm: 0 }}>
        {sectionTitle}
      </Typography>
      {lowLevelComp}
    </Container>
  );
}
