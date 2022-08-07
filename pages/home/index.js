import * as React from "react";
import Container from "@mui/material/Container";
import NewOngoingReleases from "./components/NewOngoingReleases";
import CompletedBooks from "./components/CompletedBooks";
import PopularNovels from "./components/PopularNovels";
import RecentlyUpdated from "./components/recently-updated";

export default function Home({
  newNovels,
  popularNovels,
  completedNovels,
  recentlyUpdated,
}) {
  return (
    <Container
      sx={{
        paddingLeft: { xs: 0, sm: 2 },
        paddingRight: { xs: 0, sm: 2 },
        minHeight: "100vh",
      }}
    >
      <NewOngoingReleases newNovels={newNovels} />
      <PopularNovels popularNovels={popularNovels} />
      <CompletedBooks completedNovels={completedNovels} />
      <RecentlyUpdated recentlyUpdated={recentlyUpdated} />
    </Container>
  );
}
