import * as React from "react";
import Container from "@mui/material/Container";
import NewOngoingReleases from "../components/NewOngoingReleases";
import CompletedBooks from "../components/CompletedBooks";
import PopularNovels from "../components/PopularNovels";
import RecentlyUpdated from "../components/recently-updated/RecentlyUpdated";

export default function Index() {
  return (
    <Container
      sx={{
        paddingLeft: { xs: 0, sm: 2 },
        paddingRight: { xs: 0, sm: 2 },
      }}
    >
      <NewOngoingReleases />
      <PopularNovels />
      <CompletedBooks />
      <RecentlyUpdated />
    </Container>
  );
}
