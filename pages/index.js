import * as React from "react";
import Container from "@mui/material/Container";
import NewOngoingReleases from "../components/NewOngoingReleases";
import CompletedBooks from "../components/CompletedBooks";
import PopularNovels from "../components/PopularNovels";

export default function Index() {
  return (
    <Container>
      <NewOngoingReleases />
      <PopularNovels />
      <CompletedBooks />
    </Container>
  );
}
