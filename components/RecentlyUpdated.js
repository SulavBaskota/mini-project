import { RECENTLY_UPDATED } from "../constants/RECENTLY_UPDATED";
import { useMediaQuery, Typography, Container } from "@mui/material";
import RecentlyUpdatedDesktop from "./RecentlyUpdatedDeskop";
import RecentlyUpdateMobile from "./RecentlyUpdatedMobile";

export default function RecentlyUpdated() {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
    >
      <Typography variant="h5" mt={3} mb={3} pl={{ xs: 2, sm: 0 }}>
        Recently Updated{" "}
      </Typography>
      {mobileView ? (
        <RecentlyUpdateMobile updateList={RECENTLY_UPDATED} />
      ) : (
        <RecentlyUpdatedDesktop updateList={RECENTLY_UPDATED} />
      )}
    </Container>
  );
}
